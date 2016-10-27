import { Component } from '@angular/core';
import { NavController, ViewController, Nav , Tabs } from 'ionic-angular';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController , AlertController} from 'ionic-angular';
import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';
import {Validators, FormBuilder } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import { NavParams , ModalController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataStorage } from '../../providers/data-storage/data-storage';

import { Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CrewPage } from '../crew/crew';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage 
{
    public formHome: any;
    public loadingItem: any;

    public haveCrews: boolean;

    public userCrews: any;

    public userText: any;
    public canLeave: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private mcaProvider: MovieCrewApi,
        public loadingCtrlHome: LoadingController,
        private formBuilder: FormBuilder,
        public toastCtrl: ToastController,
        private dataStorage: DataStorage,
        private viewCtrl: ViewController,
        public events: Events,
        private alertCtrl: AlertController) 
    { 
        this.userCrews = this.dataStorage.userCrews; 
   
    }

    /*ionViewWillEnter()
    {
        console.log("HOME ionViewWillEnter");

        this.userCrews = this.dataStorage.userCrews;
        
        if (!!this.userCrews["result"])
        {
            this.haveCrews = false;
            console.log("HOME: SIN CREWS");
        }
        else
        {
            this.haveCrews = true;
            
            console.log("------------------------");
            console.log("START --- HOME userCrews");
            this.userCrews.forEach(element => {
                console.log("------Crew: "+element.name);
            });
            console.log("END --- HOME userCrews");
            console.log("------------------------");
        }
        this.userText =  this.dataStorage.userName;
    }*/

    ionViewDidEnter()
    {
        console.log("HOME ionViewDidEnter");

        this.userCrews = this.dataStorage.userCrews;

        
        console.log("this.dataStorage.userCrews");
        console.log(this.dataStorage.userCrews);
        
        if (!!this.userCrews["result"])
        {
            this.haveCrews = false;
            console.log("HOME: SIN CREWS");
        }
        else
        {
            this.haveCrews = true;

            console.log("------------------------");
            console.log("START --- HOME userCrews");
            this.userCrews.forEach(element => {
                console.log("------Crew: "+element.name);
            });
            console.log("END --- HOME userCrews");
            console.log("------------------------");
        }
        this.userText =  this.dataStorage.userName;
        
    }


    selectCrew(crew_id,name) 
    {
        console.log("selectCrew id:("+crew_id+") Name:("+name+")");
        this.navCtrl.push(CrewPage, {
            crew_id: crew_id
        });
    }

    showErrors(errorText) 
    {
        let toast = this.toastCtrl.create({
            message: errorText,
            duration: 2000,
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
            duration: 5000,
            dismissOnPageChange: true
        });

        loading.present();
    }

    addCrewAlert()
    {
        let alert = this.alertCtrl.create({
        title: 'Add Crew',
        inputs: 
        [
            {
                name: 'crewName',
                placeholder: 'Crew Name'
            }
        ],
        buttons: 
        [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                console.log('Cancel clicked');
                }
            },
            {
                text: 'Add',
                handler: data => 
                {
                    console.log("addCrewAlert crewName:("+data.crewName+")");               
                    this.addCrew(data.crewName);
                }
            }
        ]
        });
        alert.present();
    }

    addCrew(name)
    {
        if (name == '')
        {
             this.showErrors("Error: you must enter a crew name.");
        }
        else
        {  
            console.log('addCrew(name)');
                       
            this.showLoadingItem();
            
            this.mcaProvider.addCrew(name,this.dataStorage.userId,this.dataStorage.userToken)
            .then(
            data => 
            {
                //this.showLoadingItem();
                if (!!data['error'])
                {
                    this.hideLoadingItem();
                    this.showErrors("Error: (addCrew): "+data['error']);
                    console.log(data);
                }
                else
                {   
                    //this.hideLoadingItem();    
                    //this.dataStorage.setUserCrews(data);    

                    console.log(data);
                    console.log("addCrew(name) - DATA");

                    this.getUserCrews(this.dataStorage.userToken);
                }
            }, 
            error => 
            {
                console.log(error);
                this.hideLoadingItem();
                this.showErrors("Error: in Data getting User Crews.(getUserCrews - Error)");
                //this.navCtrl.push(LoginPage);
            });
        }
    }
    
    getUserCrews(token)
    {        
        this.mcaProvider.getUserCrews(this.dataStorage.userId,token)
        .then(
        data => 
        {
            if (!!data['error'])
            {
                this.hideLoadingItem();
                this.showErrors("Error: (getUserCrews): "+data['error']);
                //console.log(data);
            }
            else
            {
                this.dataStorage.setUserCrews(data);
                this.hideLoadingItem();  
                console.log("addCrew(name) - DATA - getUserCrews(token)");
            }
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            this.showErrors("Error: in Data getting User Crews.(getUserCrews - Error)");
        });        
    }
    
}
