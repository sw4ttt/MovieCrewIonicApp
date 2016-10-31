import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';

/*
  Generated class for the MoviePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/movie/movie.html',
})
export class MoviePage {

    public movieTitle: any;
    public moviePlot: any;
    public moviePoster: any;
    public movieRatingIMDB: any;
    public movieYear: any;

    constructor(private navCtrl: NavController,public params: NavParams)
    {

        this.movieTitle = params.get('movieTitle');
        this.moviePlot = params.get('moviePlot');
        this.moviePoster = params.get('moviePoster');
        this.movieRatingIMDB = params.get('movieRatingIMDB');
        this.movieYear = params.get('movieYear');

    }

}
