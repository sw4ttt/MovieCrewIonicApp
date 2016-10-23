import { Component } from '@angular/core';
import { NavController, Nav, Tabs} from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {


    constructor(public navCtrl: NavController) 
    {
    }
  
    back()
    {
        //this.mcaProvider.setMessage("Home rocks!");
        //this.mcaProvider.getMovie();
        this.navCtrl.push(HomePage);
    }



}
