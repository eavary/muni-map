
import { Vehicle } from '../model/vehicle.model';

import { Subject } from 'rxjs/Subject';

export class VehiclesService {

  vehiclesChanged = new Subject<Vehicle[]>();

  private filter = 'any';
  private vehicles: Vehicle[] = [];

  getVehicles() {
    const self = this;

    if (self.filter === 'any') {
      return self.vehicles.slice();
    }
    return self.vehicles.filter(
      (vehicle: Vehicle) => {
        return (vehicle.routeTag === self.filter) ? true : false;
      }
    );
  }

  setVehicles(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
    // the next method triggers the Subject to notify subscribers of the change
    this.vehiclesChanged.next(this.vehicles.slice());
  }

  setFilter(filter: string) {
    this.filter = filter;
  }
}
