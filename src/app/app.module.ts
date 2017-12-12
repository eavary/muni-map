import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// https://github.com/tomwanzek/d3-ng2-service
import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { DataFileService } from './service/data-file.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { MuniMapComponent } from './muni-map/muni-map.component';
import { DataFeedService } from './service/data-feed.service';
import { VehiclesService } from './service/vehicles.service';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    MuniMapComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    D3Service,
    DataFeedService,
    DataFileService,
    VehiclesService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
