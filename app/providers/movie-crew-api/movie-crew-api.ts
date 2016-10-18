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
  public movieId: any = "";

  constructor(private http: Http) 
  {

  }

  setMessage(message) 
  {
      this.message = message;
  }

  getMovies()
  {    
  }

  getUsers()
  {
  }

  getMovie()
  {
      this.movieId = "tt0133093";
      this.http.post("https://moviecrew.herokuapp.com/api/getmovie?IMDBid="+this.movieId, '')
          .subscribe(data => 
          {
              /*this.Title = data.json().title;
              this.Year = data.json().year;
              this.Plot = data.json().plot;
              this.ratingIMDB = data.json().ratingIMDB; 
              */           
              
              console.log(data.json());  
          }, error => {
              console.log(error.json());
          });

    /*

        let body = 'IMDBid=tt0133093';
        // let body = JSON.stringify({ email: 'sw4ttt@gmail.com', password: 'maltamalta' });
        //Access-Control-Allow-Origin
        var headers = new Headers({ 'Content-Type': 'application/json'}); 
        var options = new RequestOptions({ headers: headers });

        this.http.post("https://moviecrew.herokuapp.com/api/getmovie?IMDBid=tt3263904", '')
        .subscribe(data => 
        {
            this.Title = data.json().title;
            this.Year = data.json().year;
            this.Plot = data.json().plot;
            this.ratingIMDB = data.json().ratingIMDB;            
            
            console.log(data);  
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
        */

  }

}

