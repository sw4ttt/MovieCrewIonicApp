import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieCrewApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MovieCrewApi {

  public message: any = "I'm new here";
  public tokenSession: any = "";

  constructor(private http: Http) 
  {
  }

  setMessage(message) {
    this.message = message;
  }

}

