import { Component } from '@angular/core';
import { NavController  , Nav , Tabs} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { TabsPage } from '../tabs/tabs';

import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';

import { DataStorage } from '../../providers/data-storage/data-storage';

import {Validators, FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { App } from 'ionic-angular';

import { Events } from 'ionic-angular';


/*
  Generated class for the LoginPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage 
{
    public loadingItem: any;
    public formLogin: any;

    constructor(
        private navCtrl: NavController
        ,public loadingCtrlLogin: LoadingController
        ,private mcaProvider: MovieCrewApi
        ,private formBuilder: FormBuilder
        ,public toastCtrl: ToastController
        ,private dataStorage: DataStorage
        ,private app: App
        ,public events: Events) 
    {
        /*this.loadingItem = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 5000
        });
        */ 

        this.formLogin = this.formBuilder.group({
            email: ['sw4ttt@gmail.com', Validators.required],
            password: ['boner', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        //this.tabRef = this.navCtrl.parent;

        
    }


    login()
    {

        this.showLoadingItem();

        this.mcaProvider.login(this.formLogin.value.email,this.formLogin.value.password)
        .then(
        data => 
        {
            if (!!data['error'])
            {
                this.hideLoadingItem();
                this.showErrors("Error: (login): "+data['error']);
                //console.log(data);                
            }
            else
            {
                this.dataStorage.setUserToken(data['token']);
                this.getUserInfo(data['token']);
            }                    
        }, 
        error => 
        {
            console.log(error);
            this.showErrors("Error: checking credentials.(login)");
            //this.navCtrl.pop();
        });
    }

    getUserInfo(token)
    {
        this.mcaProvider.getUser(token)
        .then(
        data => 
        {
            if (!!data['error'])
            {
                this.hideLoadingItem();
                this.showErrors("Error: (getUserInfo): "+data['error']);
                //console.log(data);
            }
            else
            {
                //console.log("LOGIN DISMISS XXXXXXXXXXXXXXXXXXXXXXXXXX");
                console.log(data);

                this.dataStorage.setUserId(data['id']);
                this.dataStorage.setUserName(data['name']);
                this.dataStorage.setUserEmail(data['email']);

                this.getUserCrews(token);

                //this.navCtrl.setRoot(HomePage);
                //this.navCtrl.push(HomePage);                             
            }
        }, 
        error => 
        {
            this.hideLoadingItem();
            console.log(error);
            //this.navCtrl.pop();
            this.showErrors("Error: Getting User Info.(getUserInfo)");
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
                this.showErrors("Error: (getUserCrews): "+data['error']);
                //console.log(data);
            }
            else
            {   
                //this.hideLoadingItem(); NO ES NECESARIO, se tiene activo dismissOnPageChange.            

                this.dataStorage.setUserCrews(data);

                console.log(data);                
                
                const root = this.app.getRootNav();
                root.popToRoot();  
                root.setRoot(TabsPage);
                             

            }
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            this.showErrors("Error: in Data getting User Crews.(getUserCrews - Error)");
        });        
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
        this.loadingItem = this.loadingCtrlLogin.create({
            content: "Please wait...LOGIN",
            dismissOnPageChange: true
        });

        this.loadingItem.present();
    }

    hideLoadingItem()
    {
        this.loadingItem.dismiss();
    }
}