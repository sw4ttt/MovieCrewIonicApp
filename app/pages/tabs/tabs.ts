import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { CrewPage } from '../crew/crew';



@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
    this.tab4Root = LoginPage;
    this.tab5Root = CrewPage;
  }
}
