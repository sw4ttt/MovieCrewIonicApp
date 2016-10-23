import { Component } from '@angular/core';
import { NavController , Nav , Tabs} from 'ionic-angular';

/*
  Generated class for the CrewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/crew/crew.html',
})
export class CrewPage {

    public tabRef: Tabs;   

    constructor(private navCtrl: NavController) 
    {
        this.tabRef = this.navCtrl.parent;

    }

    ionViewDidEnter() 
    {
        /*this.formLogin = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });*/

        this.tabRef.select(1);
    }

}
