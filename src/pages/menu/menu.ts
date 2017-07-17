import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { SignInPage } from './../sign-in/sign-in';
import { KlasifikasiPage } from './../klasifikasi/klasifikasi';
import { ChatPage } from './../chat/chat';
import { MyCalendarPage } from './../my-calendar/my-calendar';
import { SettingsPage } from './../settings/settings';
import { MahasiswaPage } from './../mahasiswa/mahasiswa';
import { DosenPage } from './../dosen/dosen';
import { HomePage } from './../home/home';
// plugin
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// page


/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  setPictures: any;
  setNama: any;
  setNim: any;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icons: any, show: boolean }>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public tmMahasiswaApi: TmMahasiswaApi,
    public storage: Storage,
  ) {
    this.loadMenu();
    this.loadMhs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  loadMenu() {
    // let loading = this.loadingCtrl.create({
    //   content: "Loading..."
    // });
    // loading.present();

    // loading.dismiss().then(
    //   value => {

    this.pages = [
      { title: 'Home', component: HomePage, icons: 'home', show: true },
      { title: 'Dosen Pembimbing', component: DosenPage, icons: 'people', show: true },
      { title: 'Mahasiswa', component: MahasiswaPage, icons: 'contacts', show: true },
      { title: 'Klasifikasi', component: KlasifikasiPage, icons: 'contact', show: true },
      { title: 'My Calendar', component: MyCalendarPage, icons: 'calendar', show: true },
      { title: 'Chat', component: ChatPage, icons: 'chatbubbles', show: true },
      { title: 'Pengaturan', component: SettingsPage, icons: 'settings', show: true }
    ];
    // });

  }
  // gotopage 
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  loadMhs() {
    this.storage.get('stuserid').then((stuserid) => {
      this.tmMahasiswaApi.find({
        where: { userid: stuserid }
      }).subscribe(val => {
        if (val) {
          this.setPictures = val[0]['pictures'];
          this.setNama = val[0]['nama'];
          this.setNim = val[0]['nim'];
        }
      });
    });
  }
}
