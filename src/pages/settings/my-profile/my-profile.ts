import { TmDosenApi } from './../../../shared/sdk/services/custom/TmDosen';
import { Storage } from '@ionic/storage';
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
  stuserid: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi,
    private toastCtrl: ToastController,
    public storage: Storage,
    public tmDosenApi: TmDosenApi
  ) {
    this.storage.ready().then(() => {
      this.storage.get('stuserid').then((stuserid) => {
        this.storage.get('roleid').then((roleid) => {
          this.stuserid = stuserid;
          if (roleid == 2) {
            this.loadDataMhs(stuserid);
          } else {
            this.loadDataDsn(stuserid);
          }
        });
      });
    });
  }

  loadDataMhs(stuserid) {
    this.tmMahasiswaApi.find({
      where: {
        userid: stuserid
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

  loadDataDsn(stuserid) {
    this.tmDosenApi.find({
      where: {
        userid: stuserid
      }
    }).subscribe(val => {
      if (val.length) {
        this.setPictures = 'http://localhost:3000/api/containers/' + stuserid + '/download/' + val[0]['pictures'];
        this.setNim = val[0]['nidn'];
        this.setNama = val[0]['nama'];
        this.setTelephone = val[0]['telphone'];
      }
    });
  }

  doUpdate() {
    console.log(this.setNim, this.setNama, this.setTelephone);
    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        if (roleid == 2) {

          this.tmMahasiswaApi.updateAll({
            userid: stuserid
          }, {
              nim: this.setNim,
              nama: this.setNama,
              telphone: this.setTelephone
            }).subscribe((val) => {
              console.log(val, 'sukses');
              let toast = this.toastCtrl.create({
                message: 'Updated successfully',
                duration: 1000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
                this.navCtrl.pop();
              });

              toast.present();
            }, (error) => {
              console.log(error);
            });

        } else {
          this.tmDosenApi.updateAll({
            userid: stuserid
          }, {
              nidn: this.setNim,
              nama: this.setNama,
              telephone: this.setTelephone
            }).subscribe((val) => {
              console.log(val, 'sukses');
              let toast = this.toastCtrl.create({
                message: 'Updated successfully',
                duration: 1000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
                this.navCtrl.pop();
              });

              toast.present();
            }, (error) => {
              console.log(error);
            });
        }
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

}
