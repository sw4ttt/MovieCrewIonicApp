import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public respuesta: any; 

  constructor(public navCtrl: NavController, private mcaProvider: MovieCrewApi) 
  {  
  }
}
