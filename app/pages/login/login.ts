import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';

import {Validators, FormBuilder } from '@angular/forms';

import { NativeStorage } from 'ionic-native';


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
        content: "Please wait...",
        duration: 5000
    }); 

    this.formLogin = this.formBuilder.group({
        email: ['sw4ttt@gmail.com', Validators.required],
        password: ['boner', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
        
  }
  /*
  ionViewLoaded() 
  {
      this.formLogin = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      });
  }
  */

  login()
  {
      //console.log(this.formLogin.value.email);

      this.loadingItem.present();

      //this.respuesta = this.mcaProvider.login(this.formLogin.value.email,this.formLogin.value.password,this.loadingItem);

      this.mcaProvider.login(this.formLogin.value.email,this.formLogin.value.password,this.loadingItem)
      .then(
      data => 
      {
          console.log(data);
          this.navCtrl.push(HomePage);
      }, 
      error => 
      {
          console.log(error);
          this.navCtrl.push(LoginPage);
      });
      

      //this.navCtrl.push(ContactPage);
  }

  getMovie()
  {
      this.loadingItem.present();

      this.mcaProvider.getMovie("tt0133093",this.loadingItem)
      .then(
      data => 
      {
          console.log(data);
          //this.navCtrl.push(HomePage);
      }, 
      error => 
      {
          console.log(error);
          //this.navCtrl.push(LoginPage);
      });

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