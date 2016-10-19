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

    public tokenSession: any = "";
    public movieId: any = "";
    public data: any;

    constructor(private http: Http) 
    {
    }

    login(email, password,loadingItem)
    {
        //console.log(this.testStuff(email, password));

        
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
                loadingItem.dismiss();
                resolve(data.json());

            }, error => 
            {
                //console.log(error.json());
                loadingItem.dismiss();
                resolve(error.json());
            });
        }); 
  
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
        /*if (this.data) 
        {
            return Promise.resolve(this.data.json());
        }
        */

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

    getUsers()
    {
    }

    getMovie(IMDBid,loadingItem)
    {

        //this.movieId = "tt0133093";
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/getmovie?IMDBid="+IMDBid, '')
            .subscribe(data => 
            {
                /*this.Title = data.json().title;
                this.Year = data.json().year;
                this.Plot = data.json().plot;
                this.ratingIMDB = data.json().ratingIMDB; 
                */           
                //console.log(data.json());
                loadingItem.dismiss();
                resolve(data.json());

            }, error => 
            {
                //console.log(error.json());
                loadingItem.dismiss();
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

}

