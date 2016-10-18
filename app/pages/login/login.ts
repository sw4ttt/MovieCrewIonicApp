import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ContactPage } from '../contact/contact';

import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';

import {Validators, FormBuilder } from '@angular/forms';


/*
  Generated class for the LoginPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  public loadingItem: any; 
  public formLogin: any; 

  constructor(private navCtrl: NavController,public loadingCtrl: LoadingController,private mcaProvider: MovieCrewApi,private formBuilder: FormBuilder) 
  {
    this.loadingItem = this.loadingCtrl.create({
      content: "Please wait..."
    });     
  }
  
  ionViewLoaded() 
  {
      this.formLogin = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      });
  }
  login(){
    console.log(this.formLogin.value.email);
  }

  presentLoading() 
  {
    this.loadingItem.present();

    //loader.dismiss();
  }

    testGetMovie(){
        //this.mcaProvider.setMessage("Home rocks!");
        this.mcaProvider.getMovie();
    }

  /*
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    

    loader.onDidDismiss(() => {
    this.navCtrl.push(ContactPage);
  });
  }
  */


}