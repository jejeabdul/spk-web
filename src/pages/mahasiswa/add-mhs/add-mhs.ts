import { AuthApi } from './../../../shared/sdk/services/custom/Auth';
import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
// import { ValidationService } from './../../../components/validation.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events, ViewController } from 'ionic-angular';
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
  items: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public tmMahasiswaApi: TmMahasiswaApi,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public authApi: AuthApi,
    public viewCtrl: ViewController,
  ) {
    this.myForm = fb.group({
      'txtNIM': ['', Validators.required],
      'txtNama': ['', Validators.required],
      'txtTelepon': ['', Validators.required],
      'txtTTL': ['', Validators.required],
      'selJK': ['', Validators.required],
      'txtTahunMasuk': ['', Validators.required],
      'txtJudulSKripsi': ['', Validators.required],
      'selKategori1': ['', Validators.required],
      'selKategori2': ['', Validators.required],
      'selKategori3': ['', Validators.required],
    });

    this.items = [
      { value: 1, name: 'Rekayasa Perangkat Lunak', detail: 'Web, Mobile, AR, Multimedia' },
      { value: 2, name: 'Jaringan', detail: 'Arsitektur Jaringan, Robotika, Mobile, Cloud, Mikrokontroller' },
      { value: 3, name: 'AI(Artificial Intelligence', detail: 'SPK, Multimedia, Robotika, Game' }
    ];
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
    this.authApi.doAddMhs({
      nim: data.txtNIM,
      nama: data.txtNama,
      telphone: data.txtTelepon,
      ttl: data.txtTTL,
      pictures: '',
      jenisKelamin: data.selJK,
      tahunmasuk: data.txtTahunMasuk,
      judulskripsi: data.txtJudulSKripsi,
      kategori1: data.selKategori1,
      kategori2: data.selKategori2,
      kategori3: data.selKategori3
    }).subscribe(value => {
      console.log(value, 'lalalaa');
      loading.dismiss().then(
        rest => {
          if (value.length != 0) {
            this.events.publish('user:mhsadd');
            this.alertCtrl.create({
              message: 'Add Mahasiswa Successfully',
              buttons: [{
                text: 'OK',
                handler: data => {
                  this.viewCtrl.dismiss();
                }
              }]
            }).present();
          }
        });
    });
  }

}
