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
    public userToken: any;

    constructor(private http: Http) 
    {
        this.userToken = 'empty';
    }

    login(email, password)
    {
        //console.log(this.testStuff(email, password));
        /*if (this.data) 
        {
            //loadingItem.dismiss();
            return Promise.resolve(this.data.json());
        }
        */        
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/login?email="+email+"&password="+password, '')
            .subscribe(data => 
            {
                resolve(data.json());

            }, error => 
            {
                resolve(error.json());
            });
        });   
    }
    getUserInfo()
    {
        
    }

    getMovie(IMDBid)
    {

        //this.movieId = "tt0133093";
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/getmovie?IMDBid="+IMDBid, '')
            .subscribe(data => 
            {
                resolve(data.json());

            }, error => 
            {
                resolve(error.json());
            });
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

    getMovies()
    {

        //this.movieId = "tt0133093";
        return new Promise(resolve => 
        {
            this.http.get("https://moviecrew.herokuapp.com/api/movies")
            .subscribe(data => 
            {
                resolve(data.json());

            }, error => 
            {
                resolve(error.json());
            });
        });
    }
    getUserCrews(userId)
    {

        //this.movieId = "tt0133093";
        return new Promise(resolve => 
        {
            this.http.get("https://moviecrew.herokuapp.com/api/getusercrews?user_id="+userId)
            .subscribe(data => 
            {
                resolve(data.json());

            }, error => 
            {
                resolve(error.json());
            });
        });
    }

}

