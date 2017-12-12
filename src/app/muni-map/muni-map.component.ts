
import { Component, OnInit } from '@angular/core';
import { D3Service, D3 } from 'd3-ng2-service';
import { Subscription } from 'rxjs/Subscription';

import { DataFeedService } from '../service/data-feed.service';
import { DataFileService } from '../service/data-file.service';
import { Vehicle } from '../model/vehicle.model';
import { VehiclesService } from '../service/vehicles.service';

@Component({
  selector: 'app-muni-map',
  styleUrls: ['./muni-map.component.css'],
  templateUrl: './muni-map.component.html'
})
export class MuniMapComponent implements OnInit {

  vehiclesChangedSubscription: Subscription;
  routes;

  private d3: D3;
  private projection: any;
  private svg;

  constructor(
    private d3Service: D3Service,
    private dataFeedService: DataFeedService,
    private dataFileService: DataFileService,
    private vehiclesService: VehiclesService
  ) {
    this.d3 = d3Service.getD3();

    // start by showing all vehicles
    this.vehiclesService.setFilter('any');

    // subscribe to perform a new render call when the vehicles array changes
    this.vehiclesChangedSubscription = this.vehiclesService.vehiclesChanged
      .subscribe(
        (vehicles: Vehicle[]) => {
          this.renderVehicles();
        }
      );
   }

  ngOnInit() {

    let path: any;
    let center: any;
    let width: number;
    let height: number;
    let scale = 300000;

    this.svg = this.d3.select('svg');
    width = Number(this.svg.attr('width'));
    height = Number(this.svg.attr('height'));

    this.dataFileService
      .getFile('streets.json')
      .subscribe(
        json => {

          center = this.d3.geoCentroid(json); // [long, lat]

          // define initial map projection
          this.projection = this.d3.geoMercator()
            .scale(scale)
            .center(center)
            .translate([width / 2, height / 2]);
          path = this.d3.geoPath().projection(this.projection);

          // a more precise centering and scaling technique inspired by
          // https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object

          // using the path determine the bounds of the current map and use
          // these to determine better values for the scale and translation
          const bounds  = path.bounds(json);
          const hscale  = scale * width  / (bounds[1][0] - bounds[0][0]);
          const vscale  = scale * height / (bounds[1][1] - bounds[0][1]);
          scale = (hscale < vscale) ? hscale : vscale;

          // new projection
          this.projection = this.d3.geoMercator()
            .center(center)
            .scale(scale)
            .translate([
              width - (bounds[0][0] + bounds[1][0]) / 2,
              height - (bounds[0][1] + bounds[1][1]) / 2
            ]);
          path = path.projection(this.projection);

          this.svg.selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .styles({fill: 'none', stroke: '#666'});

          // now that the map exists, get vehicle data
          this.dataFeedService.getVehicles();
          setInterval(() => {
            this.dataFeedService.getVehicles();
          }, 15000);
        },
        error => {
          console.log(error);
        }
      );
  }

  renderVehicles() {
    const self = this;
    const vehicles = this.vehiclesService.getVehicles();

    // remove old circles first
    this.svg.selectAll('circle').remove();

    self.svg.selectAll('circle')
      .data(vehicles)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('transform', (vehicle: Vehicle) => {
        // console.log('vehicle:', vehicle);
        return 'translate(' + self.projection([vehicle.lon, vehicle.lat]) + ')';
      })
      .style('fill', 'red')
      .classed('pin', true);
  }

  onSetFilter(tag: string) {
    this.vehiclesService.setFilter(tag);
    this.renderVehicles();
  }

}
