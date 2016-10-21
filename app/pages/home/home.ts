import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';
import {Validators, FormBuilder } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataStorage } from '../../providers/data-storage/data-storage';

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
        ,private viewCtrl: ViewController) 
    {
        this.formHome = this.formBuilder.group({
            IMDBid: ['', Validators.required],
        });  

        this.haveCrews = false;

        this.userText =  "xxx";

        this.getUserCrews();
    }

    getUserCrews()
    {
        this.showLoadingItem();
        

        this.userText = this.dataStorage.userName;
        
        this.mcaProvider.getUserCrews(this.dataStorage.userId)
        .then(
        data => 
        {
            if (!!data['user_id'])
            {
                this.hideLoadingItem();
                this.showErrors("Error: in Data getting User Crews.(getUserCrews - Data)");
                //console.log(data);
            }
            else
            {
                this.hideLoadingItem();
                
                this.loadingItem.onDidDismiss(() => 
                {
                    console.log("HOME DISMISS XXXXXXXXXXXXXXXXXXXXXXXX"); 
                    //console.log(data);                
                    this.userCrews = data;
                    this.haveCrews = true;                    
                });                
            }
        }, 
        error => 
        {
            console.log(error);
            //this.hideLoadingItem();
            this.showErrors("Error: in Data getting User Crews.(getUserCrews - Error)");
            this.navCtrl.push(LoginPage);
        });        
        
        //this.hideLoadingItem();
    }
    
    /*
    getCrewMovies(crew_id)
    {
        this.showLoadingItem();

        var user_id = "1";

        this.mcaProvider.getUserCrews(user_id)
        .then(
        data => 
        {
            console.log(data);
            this.hideLoadingItem();
            this.userCrews = data;
            //this.navCtrl.push(HomePage);
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            //this.navCtrl.push(LoginPage);
        });
    }
    */

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
