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
    public tmDosenApi: TmDosenApi,
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

    this.authApi.doAddDsn({
      nidn: data.txtNIDN,
      alamat: data.alamat,
      createddate: new Date(),
      idFungsional: data.txtFungsional,
      jeniskelamin: data.jk,
      idKompetensi: data.txtKompetensi,
      idKuota: data.txtKuota,
      nama: data.txtNama,
      idPendidikan: data.jenjang,
      telephone: data.txtTelepon,
      ttl: data.txtTTL,
      pictures: ''
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
