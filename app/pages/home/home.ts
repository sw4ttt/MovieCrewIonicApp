import { Component } from '@angular/core';
import { NavController, ViewController, Nav , Tabs } from 'ionic-angular';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';
import {Validators, FormBuilder } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import { NavParams , ModalController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataStorage } from '../../providers/data-storage/data-storage';

import { Events } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [LoadingController]
})
export class HomePage 
{
    public formHome: any;
    public loadingItem: any;

    public haveCrews: boolean;

    public userCrews: any;

    public userText: any;

    constructor(
        public navCtrl: NavController
        ,public navParams: NavParams
        , private mcaProvider: MovieCrewApi
        ,public loadingCtrlHome: LoadingController
        ,private formBuilder: FormBuilder
        ,public toastCtrl: ToastController
        ,private dataStorage: DataStorage
        ,private viewCtrl: ViewController
        ,public events: Events) 
    {
        this.formHome = this.formBuilder.group({
            IMDBid: ['', Validators.required],
        });  

        this.haveCrews = true;

        this.userCrews = this.dataStorage.userCrews;
        this.userText =  this.dataStorage.userName;

        this.ejecutarEventos(); 

    }

    ejecutarEventos()
    {
        this.events.subscribe('thatevento', () => 
        {
            // userEventData is an array of parameters, so grab our first and only arg
            console.log("EVENTO GOOD CALL");
        });  
    }

    clickCrew(crew_id,name) 
    {
        console.log("Click Crew id:"+crew_id+" : "+name);
    }


    tapEvent($event,itemName) 
    {
        console.log("Tap "+itemName);
    }
    

    showErrors(errorText) 
    {
        let toast = this.toastCtrl.create({
            message: errorText,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    }

    showLoadingItem()
    {
        this.loadingItem = this.loadingCtrlHome.create({
            content: "Please wait... HOME",
            dismissOnPageChange: true
        });

        this.loadingItem.present();
    }

    hideLoadingItem()
    {
        this.loadingItem.dismiss();
    }

    showLoadingItemWithTime() 
    {
        let loading = this.loadingCtrlHome.create({
            content: 'Please wait... con Tiempo 5seg.',
            duration: 5000
        });

        loading.present();
    }
}
