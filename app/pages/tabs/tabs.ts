import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { CrewPage } from '../crew/crew';
import { DataStorage } from '../../providers/data-storage/data-storage';



@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;

  public selectedTab: any;

  constructor(private dataStorage: DataStorage) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = LoginPage;
    this.tab3Root = CrewPage;
    this.tab4Root = ContactPage;
    this.tab5Root = AboutPage;

    this.selectedTab = this.dataStorage.selectedTab;    
  }

      ionViewLoaded() 
    {
        this.selectedTab = this.dataStorage.selectedTab; 
    }
}
