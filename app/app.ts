import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';

import {MovieCrewApi} from './providers/movie-crew-api/movie-crew-api';

import {DataStorage} from './providers/data-storage/data-storage';

import { LoginPage } from './pages/login/login';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    
  }
}

ionicBootstrap(MyApp , [MovieCrewApi,DataStorage]);
