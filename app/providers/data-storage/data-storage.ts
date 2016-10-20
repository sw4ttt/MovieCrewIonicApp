import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class DataStorage {

    public userToken: any;
    public userId: any;
    public userName: any;
    public userEmail: any;
    public userCrews: any;

    constructor(private http: Http) 
    {
        this.userToken = "empty";
        this.userId = "empty";
        this.userName = "empty";
        this.userEmail = "empty";
    }

    setUserToken(token)
    {
        this.userToken = token;    
    }

    setUserId(id)
    {
        this.userId = id;  
    }

    setUserName(name)
    {
        this.userName = name;  
    }

    setUserEmail(email)
    {
        this.userEmail = email;  
    }
}

