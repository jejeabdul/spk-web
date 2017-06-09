import { TmDosenApi } from './../../../shared/sdk/services/custom/TmDosen';
import { AuthApi } from './../../../shared/sdk/services/custom/Auth';
// import { ValidationService } from './../../../components/validation.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AddMhsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-dosen',
  templateUrl: 'add-dosen.html',
})
export class AddDosenPage {
  public myForm: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public tmDosen: TmDosenApi,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public authApi: AuthApi
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMhsPage');
  }

  doSimpanDosen(data) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading...'
    });
    loading.present();
    
    console.log(data, 'data mhs');
    this.tmDosen.create({
        nidn: data.txtNIDN,
        alamat: data.alamat,
        createddate: new Date(),
        fungsional: data.txtFungsional,
        jeniskelamin: data.jk,
        kompetensi: data.txtKompetensi,
        kuota: data.txtKuota,
        nama: data.txtNama,
        pendidikan: data.jenjang,
        telephone: data.txtTelepon,
        ttl: data.txtTTl
    }).subscribe(value => {
      loading.dismiss().then(
        rest => {
          this.events.publish('user:mhsadd');
          this.alertCtrl.create({
            message: 'Add Dosen Successfully',
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
