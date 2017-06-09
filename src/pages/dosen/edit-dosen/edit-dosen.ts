import { TmDosenApi } from './../../../shared/sdk/services/custom/TmDosen';
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
  selector: 'page-edit-dosen',
  templateUrl: 'edit-dosen.html',
})
export class EditDosenPage {
  getParamNidn: any;
  items: any;
  public myForm: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmdosen: TmDosenApi,
    public fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
        this.myForm = fb.group({
      'txtNIDN': ['', Validators.required],
      'txtNama': ['', Validators.required],
      'txtTelepon': ['', Validators.required],
      'jenjang': ['', Validators.required],
      'txtTTL': ['', Validators.required],
      'jk': ['', Validators.required],
      'txtKuota': ['', Validators.required],
      'txtKompetensi': ['', Validators.required],
      'alamat': ['', Validators.required],
      'txtFungsional': ['', Validators.required],
    });
    
    this.getParamNidn = this.navParams.get('data');
    this.doDataEdit(this.getParamNidn);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMhsPage');
  }

  doDataEdit(nidn) {
    this.tmdosen.find({
      where: {
        nimdn: nidn
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
    this.tmdosen.updateAll({
      nim: data.txtNIM
    }, {
        nama: data.txtNama,
        ttl: data.txtTTL,
        jeniskelamin: data.jk,
        jenjang: data.jenjang,
      }).subscribe(value => {
        loading.dismiss().then(
          rest => {
            this.events.publish('user:mhsadd');
            this.alertCtrl.create({
              message: 'Update Dosen Successfully',
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
