import { TbHistoriKlasifikasiApi } from './../../shared/sdk/services/custom/TbHistoriKlasifikasi';
import { TmDosenApi } from './../../shared/sdk/services/custom/TmDosen';
import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { TbDetailKomptensiDosenApi } from './../../shared/sdk/services/custom/TbDetailKomptensiDosen';
import { TmKuotaApi } from './../../shared/sdk/services/custom/TmKuota';
import { TbKriteriaApi } from './../../shared/sdk/services/custom/TbKriteria';
import { TmFungsionalDosenApi } from './../../shared/sdk/services/custom/TmFungsionalDosen';
import { TmPendidikanDosenApi } from './../../shared/sdk/services/custom/TmPendidikanDosen';
import { TmviewhistorykriteriaApi } from './../../shared/sdk/services/custom/Tmviewhistorykriteria';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';

/**
 * Generated class for the KlasifikasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-klasifikasi',
  templateUrl: 'klasifikasi.html',
})
export class KlasifikasiPage {
  items: any = [];
  itemsDSN: any = [];
  arrPend: any = [];
  arrFunc: any = [];
  arrDeatil: any = [];
  arrKriteria: any = [];
  arrMhs: any;
  idxMhs: any = -1;
  arrDSN: any;
  idxDSN: any = -1;
  max_pend: any = 0;
  max_fung: any = 0;
  max_kat1: any = 0;
  max_kat2: any = 0;
  max_kat3: any = 0;
  max_kuota: any = 0;
  arrkuota: any = [];

  loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public events: Events,
    public tmviewhistorykriteriaApi: TmviewhistorykriteriaApi,
    public tmPendidikanDosenApi: TmPendidikanDosenApi,
    public tmFungsionalDosenApi: TmFungsionalDosenApi,
    public tbKriteriaApi: TbKriteriaApi,
    public tmKuotaApi: TmKuotaApi,
    public tbDetailKomptensiDosenApi: TbDetailKomptensiDosenApi,
    public tmMahasiswaApi: TmMahasiswaApi,
    public tmDosenApi: TmDosenApi,
    public tbHistoriKlasifikasiApi: TbHistoriKlasifikasiApi
  ) {

    this.loadViewHistoriKriteria();
    this.loadMahasiswa();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KlasifikasiPage');
  }
  // |||||||||||||||||||||||||||||||||| BEGIN KLASIFIKASI DOSEN |||||||||||||||||||||||||||||||||||
  loadMahasiswa() {
    // mhs
    this.tmMahasiswaApi.find().subscribe(val => {
      this.arrMhs = val;
    });
  }
  doKlasifikasi() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait, Proses Klasifikasi Dosen Pembimbing...'
    });
    this.loading.present();
    this.tmPendidikanDosenApi.find().subscribe(reqpend => {
      for (let a = 0; a < reqpend.length; a++) {
        this.arrPend[reqpend[a]['id']] = reqpend[a]['bobot'];
      }
      // fung
      this.tmFungsionalDosenApi.find().subscribe(reqfunc => {
        for (let aa = 0; aa < reqfunc.length; aa++) {
          this.arrFunc[reqfunc[aa]['id']] = reqfunc[aa]['bobot'];
        }

        this.tbDetailKomptensiDosenApi.find().subscribe(reqDetail => {
          for (let aaa = 0; aaa < reqDetail.length; aaa++) {
            if (typeof this.arrDeatil[reqDetail[aaa]['idDosen']] === 'undefined') {
              this.arrDeatil[reqDetail[aaa]['idDosen']] = [];
            }
            this.arrDeatil[reqDetail[aaa]['idDosen']][reqDetail[aaa]['idKompetensi']] = reqDetail[aaa]['bobot'];

          }

          this.tbKriteriaApi.find().subscribe(result => {
            for (let aaaa = 0; aaaa < result.length; aaaa++) {
              this.arrKriteria[result[aaaa]['id']] = result[aaaa]['bobot'];
            }
            console.log('beres');
            this.idxMhs = -1;
            this.doGenerateDSN();
            console.log('lewat terkahir');
          });
        });

      });
    });

  }

  doGenerateDSN() {
    this.tmDosenApi.find().subscribe(req => {
      this.arrDSN = req;
      this.idxMhs += 1;
      this.idxDSN = 0;
      this.doLoopMhs();
    });
  }

  doLoopMhs() {
    if (this.idxMhs < this.arrMhs.length - 0) {
      this.idxDSN = -1;
      this.doProsesDSN();
    } else {
      this.loading.dismiss().then(
        rest => {
          this.loadViewHistoriKriteria();
        });
    }
  }

  doProsesDSN() {
    this.idxDSN += 1;
    this.doLoopDSN();
  }

  doLoopDSN() {
    if (this.idxDSN >= this.arrDSN.length) {
      console.log('masuk if');
      this.UpdateHasil(this.arrMhs[this.idxMhs]['id'], );
      // this.doGenerateDSN();

    } else {
      // for (let a = 0; a < this.arrDSN.length; a++) {
      if (this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']] > this.max_pend) {
        this.max_pend = this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']];
      }

      if (this.arrFunc[this.arrDSN[this.idxDSN]['idFungsional']] > this.max_fung) {
        this.max_fung = this.arrFunc[this.arrDSN[this.idxDSN]['idFungsional']];
      }

      if (this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori1']] > this.max_kat1) {
        this.max_kat1 = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori1']];
      }

      if (this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori2']] > this.max_kat2) {
        this.max_kat2 = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori2']];
      }

      if (this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori3']] > this.max_kat3) {
        this.max_kat3 = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori3']];
      }

      var valkuotatemp = 0;
      this.tbHistoriKlasifikasiApi.find({
        where: {
          and: [{ idDosen: this.arrDSN[this.idxDSN]['id'], hasil: 1 }]
        }
      }).subscribe(reqHist => {
        console.log(' =', reqHist.length);
        this.tmKuotaApi.find({
          where: {
            and: [{ kuotaMin: { lte: reqHist.length }, kuotaMax: { gt: reqHist.length } }]
          }
        }).subscribe(reqkuotadata => {
          console.log(' ==', reqkuotadata.length);
          this.max_kuota = 0;
          for (let j = 0; j < reqkuotadata.length; j++) {
            valkuotatemp = reqkuotadata[j]['bobot'];
            if (valkuotatemp > this.max_kuota) {
              this.max_kuota = valkuotatemp;
            }
            console.log("valkuotatemp", valkuotatemp);
          }

          this.arrkuota[this.arrDSN[this.idxDSN]['id']] = valkuotatemp;

          console.log('doLoopDSN', this.idxDSN);
          // if (this.idxDSN >= this.arrDSN.length) {
          //   console.log('masuk if');
          //   this.UpdateHasil(this.arrMhs[this.idxMhs]['id'], );
          //   // this.doGenerateDSN();

          // } else {
          this.tbHistoriKlasifikasiApi.create({
            idMahasiswa: this.arrMhs[this.idxMhs]['id'],
            idDosen: this.arrDSN[this.idxDSN]['id'],
            bobot: 0,
            hasil: 0,
          }).subscribe(res => {
            // begin update
            console.log(this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']], '===', this.max_pend, '===', this.arrKriteria[1]);
            var pendtemp = this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']] / this.max_pend * this.arrKriteria[1];
            var functemp = this.arrFunc[this.arrDSN[this.idxDSN]['idFungsional']] / this.max_fung * this.arrKriteria[2];
            var kat1temp = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori1']] / this.max_fung * this.arrKriteria[3];
            var kat2temp = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori2']] / this.max_fung * this.arrKriteria[4];
            var kat3temp = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori3']] / this.max_fung * this.arrKriteria[5];
            var kuotatemp = parseFloat(this.arrkuota[this.arrDSN[this.idxDSN]['id']]);
            //var kuotatemp = (typeof arrkuota[this.arrDSN[this.idxDSN]['id']]!=='undefined'?arrkuota[this.arrDSN[this.idxDSN]['id']]:0);
            if (this.max_kuota == 0) {
              kuotatemp = 0;
            } else {
              kuotatemp /= this.max_kuota * this.arrKriteria[6];
            }
            console.log(this.max_kuota, '+', this.arrKriteria[6], '+', kuotatemp);
            kuotatemp = isNaN(kuotatemp) ? 0 : kuotatemp;
            var jml = pendtemp + functemp + kat1temp + kat2temp + kat3temp + kuotatemp;
            // var jml = pendtemp + functemp + kat1temp + kat2temp + kat3temp;
            console.log(this.arrkuota[this.arrDSN[this.idxDSN]['id']], ' jeje ', this.max_kuota, ' naon ', this.arrKriteria[6]);

            console.log(pendtemp, ' ', functemp, ' ', kat1temp, ' ', kat2temp, ' ', kat3temp, ' ', kuotatemp);
            console.log(jml, 'ini jumlah', this.arrMhs[this.idxMhs]['id'], '=', this.arrDSN[this.idxDSN]['id']);
            this.tbHistoriKlasifikasiApi.updateAll({
              idMahasiswa: this.arrMhs[this.idxMhs]['id'],
              idDosen: this.arrDSN[this.idxDSN]['id']
            }, {
                bobot: jml
              }).subscribe(hasil => {
                this.doProsesDSN();
              });
          });
        });
      });
    }
    // }

  }

  UpdateHasil(idmhs) {
    // update hasil
    this.tbHistoriKlasifikasiApi.find({
      where: {
        and: [{
          idMahasiswa: idmhs
        }]
      }, limit: 2, order: 'bobot DESC'
    }).subscribe(hasilakhir => {

      for (let b = 0; b < hasilakhir.length; b++) {
        this.tbHistoriKlasifikasiApi.updateAll({
          id: hasilakhir[b]['id']
        }, {
            hasil: 1
          }).subscribe(resultAkhir => {
            if (b + 1 >= hasilakhir.length) {
              console.log(resultAkhir, 'hasil update');
              this.doGenerateDSN();
            }
          });
      }
    });
  }

  loadViewHistoriKriteria() {
    let loader = this.loadingCtrl.create({
      content: 'loading data ...'
    });
    loader.present();
    this.tmMahasiswaApi.find().subscribe(val => {

      for (let a = 0; a < val.length; a++) {
        this.tmviewhistorykriteriaApi.find({
          where: {
            idMahasiswa: val[a]['id'],
            hasil: 1
          }, order: 'namamhs ASC'
        }).subscribe(value => {
          if (value.length != 0) {
            this.itemsDSN.push({
              pictures: val[a]['pictures'],
              nim: val[a]['nim'],
              nama: val[a]['nama'],
              judulskripsi: val[a]['judulskripsi'],
              dosen: value
            });
          } else {
            this.items = [];
          }
          console.log(this.items, 'inidata hasil');
        });
      }
      loader.dismiss().then(
        rest => {
          this.items = this.itemsDSN
        });

    });

  }

  // ||||||||||||||||||||||||||||| END KLASIFIKASI DOSEN ||||||||||||||||||||||||||||||||

}
