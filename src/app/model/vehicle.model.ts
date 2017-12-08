
export class Vehicle {
  public id: string;
  public lat: string;
  public lon: string;
  public routeTag: string;
  public heading: string;
  public secsSinceReport: string;

  constructor(
    id: string,
    lat: string,
    lon: string,
    routeTag: string,
    heading: string,
    secsSinceReport: string
  ) {
    this.id =  id;
    this.lat =  lat;
    this.lon =  lon;
    this.routeTag =  routeTag;
    this.heading =  heading;
    this.secsSinceReport =  secsSinceReport;
  }
}
