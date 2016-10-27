import { Component } from '@angular/core';
import { NavController , Nav , Tabs} from 'ionic-angular';
import { MovieCrewApi } from '../../providers/movie-crew-api/movie-crew-api';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NavParams , ModalController} from 'ionic-angular';

import { MoviePage } from '../movie/movie';
import { DataStorage } from '../../providers/data-storage/data-storage';

/*
  Generated class for the CrewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/crew/crew.html'
})
export class CrewPage {

    public showMovies: boolean;
    public crewMovies: any; 
    public loadingItem: any;

    constructor(
        private navCtrl: NavController,
        private mcaProvider: MovieCrewApi,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public params: NavParams,
        public modalCtrl: ModalController,
        private dataStorage: DataStorage) 
    {
        var crew_id = this.params.get('crew_id');

        if (!!crew_id)
        {
            console.log("Crew ID - SET in PARAMS: id= "+crew_id);

            this.getCrewMovies(crew_id);
        }
        else
        {
            console.log("Crew ID - NOT SET in PARAMS");
            this.showMovies = false;
        }  
    }

    getCrewMovies(crew_id)
    {       
        this.showLoadingItem();
        //this.showLoadingItemWithTime();
        
        var token = this.dataStorage.userToken;

        this.mcaProvider.getCrewMovies(crew_id,token)
        .then(
        data => 
        {
            if (!!data['error'])
            {
                
                //this.showErrors("Error: (getCrewMovies): "+data['error']);
                console.log("getCrewMovies DATA ERROR:("+data+")"); 
                this.hideLoadingItem();
            }
            else
            {
                //console.log("LOGIN DISMISS XXXXXXXXXXXXXXXXXXXXXXXXXX");
                console.log("getCrewMovies DATA :("+data+")"); 

                this.crewMovies = data;
                this.showMovies = true;
                
                this.hideLoadingItem();                     
            }
        }, 
        error => 
        {
            this.hideLoadingItem();
            console.log("getCrewMovies ERROR :("+error+")"); 
            //this.navCtrl.pop();
            this.showErrors("Error: in Data getting Crew Movies 2.(getCrewMovies)");
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
        this.loadingItem = this.loadingCtrl.create({
            content: "Please wait...CREW",
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
        let loading = this.loadingCtrl.create({
            content: 'Please wait... con Tiempo 5seg.',
            duration: 5000
        });

        loading.present();
    }


    showMovieModal($event,title,plot,urlPoster,ratingIMDB,year)
    {
        console.log("MOVIE PRESSED");
        let movieModal = this.modalCtrl.create(MoviePage, 
        { 
            movieTitle: title, 
            moviePlot: plot, 
            moviePoster: urlPoster,
            movieRatingIMDB: ratingIMDB,
            movieYear: year 
        });
        movieModal.present();
    }

}
