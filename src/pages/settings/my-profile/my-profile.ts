import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the MyProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  setPictures: any;
  setNim: any;
  setNama: any;
  setTelephone: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi,
    private toastCtrl: ToastController
  ) {
    this.loadDataMhs();
  }

  loadDataMhs() {
    this.tmMahasiswaApi.find({
      where: {
        userid: 1
      }
    }).subscribe(item => {
      console.log(item, 11111111);
      if (item.length != 0) {
        this.setPictures = 'http://localhost:3000/api/containers/' + item[0]['nim'] + '/download/' + item[0]['pictures'];
        this.setNim = item[0]['nim'];
        this.setNama = item[0]['nama'];
        this.setTelephone = item[0]['telphone'];
      }
    });
  }

  doUpdateMhs() {
    console.log(this.setNim, this.setNama, this.setTelephone);
    this.tmMahasiswaApi.updateAll({
      userid: 1
    }, {
        nim: this.setNim,
        nama: this.setNama,
        telphone: this.setTelephone
      }).subscribe((val) => {
        console.log(val, 'sukses');
        let toast = this.toastCtrl.create({
          message: 'Updated successfully',
          duration: 3000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }, (error) => {
        console.log(error);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

}
