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
import { ContactPage } from '../../pages/contact/contact';

@Injectable()
export class MovieCrewApi
{

    public message: any = "I'm new here";
    public tokenSession: any = "";
    public movieId: any = "";
    public data: any;

    constructor(private http: Http) 
    {
    }

    login(email, password,loadingItem)
    {
        //console.log(this.testStuff(email, password));
        return this.testStuff(email, password);
  
        /*
        this.http.post("https://moviecrew.herokuapp.com/api/login?email="+email+"&password="+password, '')
        .subscribe(data => 
        {
            this.Title = data.json().title;
            this.Year = data.json().year;
            this.Plot = data.json().plot;
            this.ratingIMDB = data.json().ratingIMDB; 
            
            console.log(data.json());
            loadingItem.dismiss();

        }, error => {
            console.log(error.json());
            loadingItem.dismiss();
        }); 
        */      
    }

    testStuff(email, password) 
    {
        if (this.data) 
        {
        // already loaded data
            return Promise.resolve(this.data.json());
        }

        // don't have the data yet
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/login?email="+email+"&password="+password, '')
            .subscribe(data => 
            {
                /*this.Title = data.json().title;
                this.Year = data.json().year;
                this.Plot = data.json().plot;
                this.ratingIMDB = data.json().ratingIMDB; 
                */           
                //console.log(data.json());
                resolve(data.json());

            }, error => {
                //console.log(error.json());
                resolve(error.json());
            });
        }); 
    }

    getMovies()
    {
    }

    getUsers()
    {
    }

    getMovie(movieId)
    {

        //this.movieId = "tt0133093";
        var movieData;

        this.http.post("https://moviecrew.herokuapp.com/api/getmovie?IMDBid="+movieId, '')
            .subscribe(data => 
            {
                /*this.Title = data.json().title;
                this.Year = data.json().year;
                this.Plot = data.json().plot;
                this.ratingIMDB = data.json().ratingIMDB; 
                */           
                
                console.log(data.json());
                movieData = data.json();

            }, error => {
                //console.log(error.json());
                movieData = error.json();
            });

            return movieData;
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

