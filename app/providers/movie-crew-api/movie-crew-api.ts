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
export class MovieCrewApi
{
    public userToken: any;
    public userId: any;
    public userName: any;
    public userEmail: any;

    constructor(private http: Http) 
    {
        this.userToken = 'empty';
        this.userId = 'empty';
        this.userName = 'empty';
        this.userEmail = 'empty';
        
    }

// User Login method. returns session token. the token must be used on api requests.
    login(email, password)
    {      
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

// GET User Information.
    getUser(token)
    {
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/getuser?token="+token, '')
            .subscribe(data => 
            {
                resolve(data.json());

            }, error => 
            {
                resolve(error.json());
            });
        });
    }


// GET MOVIE BY IMDBid
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
    }

// GET the CREWS that belong to an user.
    getUserCrews(userId)
    {
        //this.movieId = "tt0133093";
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/getusercrews?user_id="+userId, '')
            .subscribe(data => 
            {
                resolve(data.json());

            }, error => 
            {
                resolve(error.json());
            });
        }); 
    }

// GET the MOVIES that belong to an CREW.
    getCrewMovies(crew_id)
    {
        //this.movieId = "tt0133093";
        return new Promise(resolve => 
        {
            this.http.post("https://moviecrew.herokuapp.com/api/getcrewmovies?crew_id="+crew_id, '')
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

