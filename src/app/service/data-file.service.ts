import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class DataFileService {

  constructor(
    private http: Http
  ) {}

  getFile(file: string) {
    return this.http.get('assets/sfmaps/' + file)
      .map((res: Response) => res.json());
  }
}
