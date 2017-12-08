# MuniMap

An Angular2 coding exercise to use [d3.js](http://d3js.org) to draw real time positions of San Francisco Muni buses and trains using data from [NextBus](http://www.nextbus.com).

Data is refreshed every 15 seconds and the results are able to be filtered by `routeTag`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3 and uses:

- node v.6.9.0
- npm v3.10.8

The [d3-ng2-service](https://github.com/tomwanzek/d3-ng2-service) is used for simplified import and use of D3.

## Getting started

```angular2html
npm install
ng serve
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
