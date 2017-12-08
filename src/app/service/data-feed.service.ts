import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Vehicle } from '../model/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Injectable()
export class DataFeedService {

  constructor(
    private http: Http,
    private vehiclesService: VehiclesService
  ) {}

  getVehicles() {

    // set the time to one minute ago
    const date = new Date();
    date.setMinutes(-1);
    const time = date.getTime();

    const params: URLSearchParams = new URLSearchParams();
    params.set('command', 'vehicleLocations');
    params.set('a', 'sf-muni');
    params.set('t', time.toString());

    const requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get('http://webservices.nextbus.com/service/publicJSONFeed', requestOptions)
      .map((res: Response) => {
        // map the response to be an array of Vehicles as we expect them
        const json = res.json();
        const vehicles: Vehicle[] = [];
        for (const vehicle of json.vehicle) {
          vehicles.push({
            id: vehicle.id,
            lat: vehicle.lat,
            lon: vehicle.lon,
            routeTag: vehicle.routeTag,
            heading: vehicle.heading,
            secsSinceReport: vehicle.secsSinceReport
          });
        }
        return vehicles;
      })
      .subscribe(
        (vehicles: Vehicle[]) => {
          this.vehiclesService.setVehicles(vehicles);
        },
        error => {
          console.log(error);
        }
      );
  }
}
