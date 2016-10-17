import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ContactPage } from '../contact/contact';


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

  constructor(private navCtrl: NavController,public loadingCtrl: LoadingController) 
  {
    this.loadingItem = this.loadingCtrl.create({
      content: "Please wait..."
    });     
  }

  presentLoading() 
  {
    this.loadingItem.present();

    //loader.dismiss();
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