import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';
import {Validators, FormBuilder } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage 
{
    public formHome: any;
    public loadingItem: any;

    public dataMovie: any; 

    public movies: any;
    public crews: any;

    constructor(public navCtrl: NavController,public navParams: NavParams, private mcaProvider: MovieCrewApi,public loadingCtrl: LoadingController,private formBuilder: FormBuilder) 
    {
        this.formHome = this.formBuilder.group({
            IMDBid: ['', Validators.required],
        });
    }

    showLoadingItem()
    {
        this.loadingItem = this.loadingCtrl.create({
            content: "Please wait..."
        });

        this.loadingItem.present();
    }

    hideLoadingItem()
    {
        this.loadingItem.dismiss();
        
        this.loadingItem = this.loadingCtrl.create({
            content: "Please wait..."
        });
    }

    // GET MOVIE BY IMDBid
    getMovie()
    {
        this.showLoadingItem();

        this.mcaProvider.getMovie(this.formHome.value.IMDBid)
        .then(
        data => 
        {
            console.log(data);
            this.hideLoadingItem();
            //this.navCtrl.push(HomePage);
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            //this.navCtrl.push(LoginPage);
        });

    }

    getUserCrews()
    {
        this.showLoadingItem();

        var user_id = "1";

        this.mcaProvider.getUserCrews(user_id)
        .then(
        data => 
        {
            console.log(data);
            this.hideLoadingItem();
            this.crews = data;
            //this.navCtrl.push(HomePage);
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            //this.navCtrl.push(LoginPage);
        });
    }
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
            this.crews = data;
            //this.navCtrl.push(HomePage);
        }, 
        error => 
        {
            console.log(error);
            this.hideLoadingItem();
            //this.navCtrl.push(LoginPage);
        });
    }
}
