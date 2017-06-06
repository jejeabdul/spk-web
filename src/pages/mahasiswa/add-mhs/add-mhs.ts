import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
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
  selector: 'page-add-mhs',
  templateUrl: 'add-mhs.html',
})
export class AddMhsPage {
  public myForm: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public tmMahasiswaApi: TmMahasiswaApi,
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMhsPage');
  }

  doSimpanMhs(data) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading...'
    });
    loading.present();
    console.log(data, 'data mhs');
    this.tmMahasiswaApi.create({
      nim: data.txtNIM,
      nama: data.txtNama,
      // email: data.txtEmail,
      ttl: data.txtTTL,
      pictures: '',
      jeniskelamin: data.selJK,
      jenjang: data.selJenjang,
      tanggalmasuk: data.selTglMasuk,
      jurusan: 'Teknik Informatika'
    }).subscribe(value => {
      loading.dismiss().then(
        rest => {
          this.events.publish('user:mhsadd');
          this.alertCtrl.create({
            message: 'Add Mahasiswa Successfully',
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
