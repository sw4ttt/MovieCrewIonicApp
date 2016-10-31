import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NavParams , ModalController, ViewController } from 'ionic-angular';

import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';

import { DataStorage } from '../../providers/data-storage/data-storage';

import {Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { App } from 'ionic-angular';

/*
  Generated class for the AddCrewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-crew/add-crew.html',
})
export class AddCrewPage {


    public formLogin: any;
    public loadingItem: any;

    constructor(
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        public loadingCtrlHome: LoadingController,
        private dataStorage: DataStorage,
        private mcaProvider: MovieCrewApi,
        public toastCtrl: ToastController,
        public params: NavParams,
        private app: App,
        public viewCtrl: ViewController) 
    {
        this.formLogin = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    addCrew()
    {
        var name = this.formLogin.value.name;

        console.log('ADD CREW: addCrew(name):->'+name);
                    
        this.showLoadingItem();
        
        this.mcaProvider.addCrew(name,this.dataStorage.userId,this.dataStorage.userToken)
        .then(
        data => 
        {
            //this.showLoadingItem();
            if (!!data['error'])
            {
                this.hideLoadingItem();
                this.showErrors("ADD CREW: Error: (addCrew): "+data['error']);
                console.log(data);
            }
            else
            {   
                //this.hideLoadingItem();    
                //this.dataStorage.setUserCrews(data);    

                //console.log(data);
                console.log("ADD CREW: addCrew(name) - DATA");

                //this.getUserCrews(this.dataStorage.userToken);

                this.viewCtrl.dismiss();
                
            }
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            this.showErrors("ADD CREW: Error: in Data getting User Crews.(getUserCrews - Error)");
            //this.navCtrl.push(LoginPage);
        });        

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
                this.showErrors("ADD CREW: Error: (getUserCrews): "+data['error']);
                //console.log(data);
            }
            else
            {
                this.dataStorage.setUserCrews(data);
                //this.hideLoadingItem();  
                console.log("ADD CREW: addCrew(name) - DATA - getUserCrews(token)");
                //this.navCtrl.pop();

                this.hideLoadingItem();        
                this.viewCtrl.dismiss();
                

            }
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            this.showErrors("ADD CREW: Error: in Data getting User Crews.(getUserCrews - Error)");
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
        console.log("ADD CREW: showLoadingItem");
        this.loadingItem = this.loadingCtrlHome.create({
            content: "Please wait... Add Crew",
            dismissOnPageChange: true
        });

        this.loadingItem.present();
    }

    hideLoadingItem()
    {
        console.log("ADD CREW: hideLoadingItem");
        setTimeout(() => {
            this.loadingItem.dismiss();
        }, 500);
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

}
