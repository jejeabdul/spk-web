import { FormBuilder, Validators } from '@angular/forms';
import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';

/**
 * Generated class for the EditMhsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-mhs',
  templateUrl: 'edit-mhs.html',
})
export class EditMhsPage {
  getParamNim: any;
  items: any;
  public myForm: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi,
    public fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
    this.myForm = fb.group({
      'txtNIM': ['', Validators.required],
      'txtNama': ['', Validators.required],
      // 'txtEmail': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      'txtTTL': ['', Validators.required],
      'selJK': ['', Validators.required],
      'selJenjang': ['', Validators.required],
      'selTglMasuk': ['', Validators.required]
    });

    this.getParamNim = this.navParams.get('data');
    this.doDataEdit(this.getParamNim);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMhsPage');
  }

  doDataEdit(nim) {
    this.tmMahasiswaApi.find({
      where: {
        nim: nim
      }
    }).subscribe(value => {
      console.log(value, 1111);
      this.items = value;
    });
  }

  doEditMhs(data) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading...'
    });
    loading.present();
    console.log(data, 222222222);
    this.tmMahasiswaApi.updateAll({
      nim: data.txtNIM
    }, {
        nama: data.txtNama,
        ttl: data.txtTTL,
        jeniskelamin: data.selJK,
        jenjang: data.selJenjang,
        tanggalmasuk: data.selTglMasuk
      }).subscribe(value => {
        loading.dismiss().then(
          rest => {
            this.events.publish('user:mhsadd');
            this.alertCtrl.create({
              message: 'Update Mahasiswa Successfully',
              buttons: [{
                text: 'OK',
                handler: data => {
                  this.navCtrl.pop();
                }
              }]
            }).present();
          });
      });
  }

}
