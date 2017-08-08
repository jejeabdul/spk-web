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
  max_kuotaBayes: any = 0;
  arrkuota: any = [];

  loading: any;

  // bayes
  arrMhsBayes: any;
  arrDsnBayes: any;
  idxMhsBayes: any;
  idxDsnBayes: any;

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

  loadMhsBayes() {
    this.tmMahasiswaApi.find(
      { where: { proses: 0 } }
    ).subscribe(val => {
      this.arrMhsBayes = val;
      this.idxMhsBayes = 0;
      this.doLoopMhsBayes();
    });
  }

  doLoopMhsBayes() {
    this.tmDosenApi.find().subscribe(valq => {
      this.arrDsnBayes = valq;
      this.idxDsnBayes = 0;
      this.doLoopDsnBayes();
    });
  }

  doLoopDsnBayes() {
    var resAccept = 1;
    var resReject = 1;
    var valAccept = 0;
    var valReject = 0;
    var arrAccept = [];
    var arrReject = [];

    this.tmviewhistorykriteriaApi.find(
      { where: { and: [{ hasil: 1 }, { proses: 1 }] } }
    ).subscribe(dataHisKriteriaA => {
      // //console.log(dataHisKriteriaA.length, 'ddd');
      valAccept = dataHisKriteriaA.length;
      //console.log(valAccept, 'valAccept');

      this.tmviewhistorykriteriaApi.find(
        { where: { and: [{ hasil: 0 }, { proses: 1 }] } }
      ).subscribe(dataHisKriteriaR => {
        //console.log(dataHisKriteriaR.length, 'dddR');
        valReject = dataHisKriteriaR.length;
        console.log(valReject, 'valReject');

        this.tmviewhistorykriteriaApi.find(
          { where: { and: [{ hasil: 1 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
        ).subscribe(dataHisKriteriaAC1 => {
          //console.log(dataHisKriteriaAC1.length, 'dddAC1');
          arrAccept.push(dataHisKriteriaAC1.length);

          this.tmviewhistorykriteriaApi.find(
            { where: { and: [{ hasil: 0 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
          ).subscribe(dataHisKriteriaRC1 => {
            //console.log(dataHisKriteriaRC1.length, 'dddRRC1');
            arrReject.push(dataHisKriteriaRC1.length);

            this.tmviewhistorykriteriaApi.find(
              { where: { and: [{ hasil: 1 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
            ).subscribe(dataHisKriteriaAC2 => {
              //console.log(dataHisKriteriaAC2.length, 'dddAC2');
              arrAccept.push(dataHisKriteriaAC2.length);

              this.tmviewhistorykriteriaApi.find(
                { where: { and: [{ hasil: 0 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
              ).subscribe(dataHisKriteriaRC2 => {
                //console.log(dataHisKriteriaRC2.length, 'dddRC2');
                arrReject.push(dataHisKriteriaRC2.length);

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaAC3 => {
                  //console.log(dataHisKriteriaAC3.length, 'dddAC3');
                  arrAccept.push(dataHisKriteriaAC3.length);

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaRC3 => {
                    //console.log(dataHisKriteriaRC3.length, 'dddRC3');
                    arrReject.push(dataHisKriteriaRC3.length);

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC4 => {
                      //console.log(dataHisKriteriaAC4.length, 'dddAC4');
                      arrAccept.push(dataHisKriteriaAC4.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC4 => {
                        //console.log(dataHisKriteriaRC4.length, 'dddRC4');
                        arrReject.push(dataHisKriteriaRC4.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC5 => {
                          //console.log(dataHisKriteriaAC5.length, 'dddAC5');
                          arrAccept.push(dataHisKriteriaAC5.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC5 => {
                            //console.log(dataHisKriteriaRC5.length, 'dddRC5');
                            arrReject.push(dataHisKriteriaRC5.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                            ).subscribe(dataHisKriteriaAC6 => {
                              //console.log(dataHisKriteriaAC6.length, 'dddAC6');
                              arrAccept.push(dataHisKriteriaAC6.length);

                              this.tmviewhistorykriteriaApi.find(
                                { where: { and: [{ hasil: 0 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                              ).subscribe(dataHisKriteriaRC6 => {
                                //console.log(dataHisKriteriaRC6.length, 'dddRC6');
                                arrReject.push(dataHisKriteriaRC6.length);
                                console.log(arrAccept, 'arrAccept');
                                console.log(arrReject, 'arrRejectarrReject');
                                for (let b = 0; b < arrAccept.length; b++) {
                                  resAccept *= (arrAccept[b] / valAccept);
                                }
                                for (let c = 0; c < arrReject.length; c++) {
                                  resReject *= (arrReject[c] / valReject);
                                }
                                console.log(valAccept, 'valAccept', resAccept, 'resAccept', valReject, 'valReject', resReject, 'resReject');
                                var bobottemp = resAccept / resReject;
                                console.log(bobottemp, 'lalalalaa');
                                // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                                this.tbHistoriKlasifikasiApi.find({
                                  where: {
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                  }
                                }).subscribe(tra => {
                                  console.log(tra.length, 'traaaaaaaaaaa');
                                  bobottemp = isNaN(bobottemp) ? 0 : bobottemp;
                                  if (tra.length) {
                                    this.tbHistoriKlasifikasiApi.updateAll({
                                      idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                      idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                    }, {
                                        bobot: bobottemp
                                      }).subscribe(hasil => {
                                        //this.doProsesDSN();
                                        if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                          this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                          console.log("selesai");
                                        } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                          this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                          this.idxMhsBayes += 1;
                                          this.doLoopMhsBayes();
                                        } else {
                                          this.idxDsnBayes += 1;
                                          this.doLoopDsnBayes();
                                        }
                                        console.log('sukses update cuy');
                                      });
                                  } else {
                                    this.tbHistoriKlasifikasiApi.create({
                                      idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                      idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'],
                                      bobot: bobottemp,
                                      hasil: 0,
                                    }).subscribe(res => {
                                      if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        console.log("selesai");
                                      } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        this.idxMhsBayes += 1;
                                        this.doLoopMhsBayes();
                                      } else {
                                        this.idxDsnBayes += 1;
                                        this.doLoopDsnBayes();
                                      }
                                      console.log('sukses insert cuy');
                                    })
                                  }
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
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
      this.UpdateHasil(this.arrMhs[this.idxMhs]['id'], false);
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
            console.log(this.max_kuota, '+', this.arrKriteria[6], '+', kuotatemp);
            if (this.max_kuota == 0) {
              kuotatemp = 0;
            } else {
              kuotatemp = this.max_kuota * this.arrKriteria[6];
            }
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

  UpdateHasil(idmhs, isbayes) {
    if (isbayes == undefined) {
      isbayes = false;
    }
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
            // proses update proses
            this.tmMahasiswaApi.updateAll({
              idMahasiswa: idmhs
            }, {
                proses: 1
              }).subscribe(ret => {
                console.log('sukses');
              });
            if (b + 1 >= hasilakhir.length) {
              console.log(resultAkhir, 'hasil update');
              if (isbayes == false) {
                this.doGenerateDSN();
              }
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

  // proses bayes
  processBayes() {
    console.log(11, 'jj');
    //select dan cari mahasiswa yg belum di proses
    this.tmMahasiswaApi.find(
      { where: { proses: 0 } }
    ).subscribe(dataMhs => {
      console.log(dataMhs.length, 'jj');
      for (let imhs = 0; imhs < dataMhs.length; imhs++) {
        // var idmhsinputan = dataMhs[imhs]['id'];
        this.tmDosenApi.find().subscribe(dataDsn => {
          console.log(dataDsn.length, 'jjjj');
          for (let idsn = 0; idsn < dataDsn.length; idsn++) {
            // this.tmviewhistorykriteriaApi.find(
            //   {
            //     where: {
            //       and: [{ idMahasiswa: dataMhs[imhs]['id'] }, { idDosen: dataDsn[idsn]['id'] }]
            //     }
            //   }
            // ).subscribe(dataHisKriteria => {
            //   //console.log(dataHisKriteria, 'jjjj');
            //   for (let a = 0; a < dataHisKriteria.length; a++) {
            var resAccept = 1;
            var resReject = 1;
            var valAccept = 0;
            var valReject = 0;
            var arrAccept = [];
            var arrReject = [];

            this.tmviewhistorykriteriaApi.find(
              { where: { and: [{ hasil: 1 }, { proses: 1 }] } }
            ).subscribe(dataHisKriteriaA => {
              // //console.log(dataHisKriteriaA.length, 'ddd');
              valAccept = dataHisKriteriaA.length;
              //console.log(valAccept, 'valAccept');

              this.tmviewhistorykriteriaApi.find(
                { where: { and: [{ hasil: 0 }, { proses: 1 }] } }
              ).subscribe(dataHisKriteriaR => {
                //console.log(dataHisKriteriaR.length, 'dddR');
                valReject = dataHisKriteriaR.length;
                console.log(valReject, 'valReject');

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { idPendidikan: dataDsn[idsn]['idPendidikan'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaAC1 => {
                  //console.log(dataHisKriteriaAC1.length, 'dddAC1');
                  arrAccept.push(dataHisKriteriaAC1.length);

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { idPendidikan: dataDsn[idsn]['idPendidikan'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaRC1 => {
                    //console.log(dataHisKriteriaRC1.length, 'dddRRC1');
                    arrReject.push(dataHisKriteriaRC1.length);

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { idFungsional: dataDsn[idsn]['idFungsional'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC2 => {
                      //console.log(dataHisKriteriaAC2.length, 'dddAC2');
                      arrAccept.push(dataHisKriteriaAC2.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { idFungsional: dataDsn[idsn]['idFungsional'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC2 => {
                        //console.log(dataHisKriteriaRC2.length, 'dddRC2');
                        arrReject.push(dataHisKriteriaRC2.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { kategori1: dataMhs[imhs]['kategori1'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC3 => {
                          //console.log(dataHisKriteriaAC3.length, 'dddAC3');
                          arrAccept.push(dataHisKriteriaAC3.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { kategori1: dataMhs[imhs]['kategori1'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC3 => {
                            //console.log(dataHisKriteriaRC3.length, 'dddRC3');
                            arrReject.push(dataHisKriteriaRC3.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { kategori2: dataMhs[imhs]['kategori2'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                            ).subscribe(dataHisKriteriaAC4 => {
                              //console.log(dataHisKriteriaAC4.length, 'dddAC4');
                              arrAccept.push(dataHisKriteriaAC4.length);

                              this.tmviewhistorykriteriaApi.find(
                                { where: { and: [{ hasil: 0 }, { kategori2: dataMhs[imhs]['kategori2'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                              ).subscribe(dataHisKriteriaRC4 => {
                                //console.log(dataHisKriteriaRC4.length, 'dddRC4');
                                arrReject.push(dataHisKriteriaRC4.length);

                                this.tmviewhistorykriteriaApi.find(
                                  { where: { and: [{ hasil: 1 }, { kategori3: dataMhs[imhs]['kategori3'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                ).subscribe(dataHisKriteriaAC5 => {
                                  //console.log(dataHisKriteriaAC5.length, 'dddAC5');
                                  arrAccept.push(dataHisKriteriaAC5.length);

                                  this.tmviewhistorykriteriaApi.find(
                                    { where: { and: [{ hasil: 0 }, { kategori3: dataMhs[imhs]['kategori3'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                  ).subscribe(dataHisKriteriaRC5 => {
                                    //console.log(dataHisKriteriaRC5.length, 'dddRC5');
                                    arrReject.push(dataHisKriteriaRC5.length);

                                    this.tmviewhistorykriteriaApi.find(
                                      { where: { and: [{ hasil: 1 }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                    ).subscribe(dataHisKriteriaAC6 => {
                                      //console.log(dataHisKriteriaAC6.length, 'dddAC6');
                                      arrAccept.push(dataHisKriteriaAC6.length);

                                      this.tmviewhistorykriteriaApi.find(
                                        { where: { and: [{ hasil: 0 }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                      ).subscribe(dataHisKriteriaRC6 => {
                                        //console.log(dataHisKriteriaRC6.length, 'dddRC6');
                                        arrReject.push(dataHisKriteriaRC6.length);
                                        console.log(arrAccept, 'arrAccept');
                                        console.log(arrReject, 'arrRejectarrReject');
                                        for (let b = 0; b < arrAccept.length; b++) {
                                          resAccept *= (arrAccept[b] / valAccept);
                                        }
                                        for (let c = 0; c < arrReject.length; c++) {
                                          resReject *= (arrReject[c] / valReject);
                                        }
                                        console.log(valAccept, 'valAccept', resAccept, 'resAccept', valReject, 'valReject', resReject, 'resReject');
                                        var bobottemp = resAccept / resReject;
                                        console.log(bobottemp, 'lalalalaa');
                                        // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                                        this.tbHistoriKlasifikasiApi.find({
                                          where: {
                                            idMahasiswa: dataMhs[imhs]['id'],
                                            idDosen: dataDsn[idsn]['id']
                                          }
                                        }).subscribe(tra => {
                                          console.log(tra.length, 'traaaaaaaaaaa');
                                          bobottemp = isNaN(bobottemp) ? 0 : bobottemp;
                                          if (tra.length) {
                                            this.tbHistoriKlasifikasiApi.updateAll({
                                              idMahasiswa: dataMhs[imhs]['id'],
                                              idDosen: dataDsn[idsn]['id']
                                            }, {
                                                bobot: bobottemp
                                              }).subscribe(hasil => {
                                                //this.doProsesDSN();
                                                if (imhs == dataMhs.length - 1 && idsn == dataDsn.length - 1) {
                                                  this.UpdateHasil(dataMhs[imhs]['id'], true);
                                                  console.log("selesai");
                                                } else if (idsn == dataDsn.length - 1) {
                                                  this.UpdateHasil(dataMhs[imhs]['id'], true);
                                                }
                                                console.log('sukses update cuy');
                                              });
                                          } else {
                                            this.tbHistoriKlasifikasiApi.create({
                                              idMahasiswa: dataMhs[imhs]['id'],
                                              idDosen: dataDsn[idsn]['id'],
                                              bobot: bobottemp,
                                              hasil: 0,
                                            }).subscribe(res => {
                                              if (imhs == dataMhs.length - 1 && idsn == dataDsn.length - 1) {
                                                this.UpdateHasil(dataMhs[imhs]['id'], true);
                                                console.log("selesai");
                                              } else if (idsn == dataDsn.length - 1) {
                                                this.UpdateHasil(dataMhs[imhs]['id'], true);
                                              }
                                              console.log('sukses insert cuy');
                                            })
                                          }
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
            //   }
            // });
          }
        });
        // });
      }
    });
  }

  // ||||||||||||||||||||||||||||| END KLASIFIKASI DOSEN ||||||||||||||||||||||||||||||||



  /**
  ----------------------------------------try bayes 00 1 ----------------------------------------
  currentperiode=2017
  this.max_kuotaBayes = Math.ceil(mhsPrd.length/dsnPrd.length)
  valAccept => where: { and: [{ hasil: 1 }, { proses: 1 }] }
  valReject => where: { and: [{ hasil: 0 }, { proses: 1 }] }
  bobottemp = (resAccept / resReject)*(this.max_kuotaBayes-dataKuotaDsn.length);
  */

  loadMhsBayes001() {
    var currentperiode = 2017;
    this.tmMahasiswaApi.find(
      { where: { periode: currentperiode } }
    ).subscribe(mhsPrd => {
      this.tmDosenApi.find(
      ).subscribe(dsnPrd => {
        this.max_kuotaBayes = Math.ceil(mhsPrd.length / dsnPrd.length);
        this.max_kuotaBayes = isNaN(this.max_kuotaBayes) ? 0 : this.max_kuotaBayes;
        this.tmMahasiswaApi.find(
          { where: { and: [{ periode: currentperiode }, { proses: 0 }] } }
        ).subscribe(val => {
          this.arrMhsBayes = val;
          this.idxMhsBayes = 0;
          this.doLoopMhsBayes001();
        });
      });
    });
  }

  doLoopMhsBayes001() {
    this.tmDosenApi.find().subscribe(valq => {
      this.arrDsnBayes = valq;
      this.idxDsnBayes = 0;
      this.doLoopDsnBayes001();
    });
  }

  doLoopDsnBayes001() {
    var resAccept = 1;
    var resReject = 1;
    var valAccept = 0;
    var valReject = 0;
    var arrAccept = [];
    var arrReject = [];

    this.tmviewhistorykriteriaApi.find(
      { where: { and: [{ hasil: 1 }, { proses: 1 }] } }
    ).subscribe(dataHisKriteriaA => {
      // //console.log(dataHisKriteriaA.length, 'ddd');
      valAccept = dataHisKriteriaA.length;
      // //console.log(valAccept, 'valAccept');

      this.tmviewhistorykriteriaApi.find(
        { where: { and: [{ hasil: 0 }, { proses: 1 }] } }
      ).subscribe(dataHisKriteriaR => {
        // //console.log(dataHisKriteriaR.length, 'dddR');
        valReject = dataHisKriteriaR.length;
        // console.log(valReject, 'valReject');

        this.tmviewhistorykriteriaApi.find(
          { where: { and: [{ hasil: 1 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
        ).subscribe(dataHisKriteriaAC1 => {
          // //console.log(dataHisKriteriaAC1.length, 'dddAC1');
          arrAccept.push(dataHisKriteriaAC1.length);

          this.tmviewhistorykriteriaApi.find(
            { where: { and: [{ hasil: 0 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
          ).subscribe(dataHisKriteriaRC1 => {
            // //console.log(dataHisKriteriaRC1.length, 'dddRRC1');
            arrReject.push(dataHisKriteriaRC1.length);

            this.tmviewhistorykriteriaApi.find(
              { where: { and: [{ hasil: 1 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
            ).subscribe(dataHisKriteriaAC2 => {
              // //console.log(dataHisKriteriaAC2.length, 'dddAC2');
              arrAccept.push(dataHisKriteriaAC2.length);

              this.tmviewhistorykriteriaApi.find(
                { where: { and: [{ hasil: 0 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
              ).subscribe(dataHisKriteriaRC2 => {
                // //console.log(dataHisKriteriaRC2.length, 'dddRC2');
                arrReject.push(dataHisKriteriaRC2.length);

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaAC3 => {
                  // //console.log(dataHisKriteriaAC3.length, 'dddAC3');
                  arrAccept.push(dataHisKriteriaAC3.length);

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaRC3 => {
                    // //console.log(dataHisKriteriaRC3.length, 'dddRC3');
                    arrReject.push(dataHisKriteriaRC3.length);

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC4 => {
                      // //console.log(dataHisKriteriaAC4.length, 'dddAC4');
                      arrAccept.push(dataHisKriteriaAC4.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC4 => {
                        // //console.log(dataHisKriteriaRC4.length, 'dddRC4');
                        arrReject.push(dataHisKriteriaRC4.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC5 => {
                          // //console.log(dataHisKriteriaAC5.length, 'dddAC5');
                          arrAccept.push(dataHisKriteriaAC5.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC5 => {
                            // //console.log(dataHisKriteriaRC5.length, 'dddRC5');
                            arrReject.push(dataHisKriteriaRC5.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }, { periode: this.arrMhsBayes[this.idxMhsBayes]['periode'] }] } }
                            ).subscribe(dataKuotaDsn => {
                              // console.log(dataKuotaDsn.length, 'dataKuotaDsn');

                              console.log(arrAccept, 'arrAccept');
                              console.log(arrReject, 'arrRejectarrReject');
                              for (let b = 0; b < arrAccept.length; b++) {
                                resAccept *= (arrAccept[b] / valAccept);
                              }
                              for (let c = 0; c < arrReject.length; c++) {
                                resReject *= (arrReject[c] / valReject);
                              }
                              console.log(valAccept, 'valAccept', resAccept, 'resAccept', valReject, 'valReject', resReject, 'resReject');
                              var bobottemp = (resAccept / resReject) * (this.max_kuotaBayes - dataKuotaDsn.length);
                              console.log(bobottemp, 'lalalalaa');
                              // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                              this.tbHistoriKlasifikasiApi.find({
                                where: {
                                  idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                  idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                }
                              }).subscribe(tra => {
                                // console.log(tra.length, 'traaaaaaaaaaa');
                                bobottemp = isNaN(bobottemp) ? 0 : bobottemp;
                                if (tra.length) {
                                  this.tbHistoriKlasifikasiApi.updateAll({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                  }, {
                                      bobot: bobottemp
                                    }).subscribe(hasil => {
                                      //this.doProsesDSN();
                                      if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        console.log("selesai");
                                      } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        this.idxMhsBayes += 1;
                                        this.doLoopMhsBayes001();
                                      } else {
                                        this.idxDsnBayes += 1;
                                        this.doLoopDsnBayes001();
                                      }
                                      console.log('sukses update cuy');
                                    });
                                } else {
                                  this.tbHistoriKlasifikasiApi.create({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'],
                                    bobot: bobottemp,
                                    hasil: 0,
                                  }).subscribe(res => {
                                    if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      console.log("selesai");
                                    } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      this.idxMhsBayes += 1;
                                      this.doLoopMhsBayes001();
                                    } else {
                                      this.idxDsnBayes += 1;
                                      this.doLoopDsnBayes001();
                                    }
                                    console.log('sukses insert cuy');
                                  })
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }


  /**
  ----------------------------------------try bayes 00 2 ----------------------------------------
  currentperiode=2017
  this.max_kuotaBayes = Math.ceil(mhsPrd.length/dsnPrd.length)
  valAccept => where: { and: [{ hasil: 1 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] }
  valReject => where: { and: [{ hasil: 0 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] }
  bobottemp = (resAccept / resReject)*(this.max_kuotaBayes-dataKuotaDsn.length);
  */

  loadMhsBayes002() {
    var currentperiode = 2017;
    this.tmMahasiswaApi.find(
      { where: { periode: currentperiode } }
    ).subscribe(mhsPrd => {
      this.tmDosenApi.find(
      ).subscribe(dsnPrd => {
        this.max_kuotaBayes = Math.ceil(mhsPrd.length / dsnPrd.length);
        this.max_kuotaBayes = isNaN(this.max_kuotaBayes) ? 0 : this.max_kuotaBayes;
        this.tmMahasiswaApi.find(
          { where: { and: [{ periode: currentperiode }, { proses: 0 }] } }
        ).subscribe(val => {
          this.arrMhsBayes = val;
          this.idxMhsBayes = 0;
          this.doLoopMhsBayes002();
        });
      });
    });
  }

  doLoopMhsBayes002() {
    this.tmDosenApi.find().subscribe(valq => {
      this.arrDsnBayes = valq;
      this.idxDsnBayes = 0;
      this.doLoopDsnBayes002();
    });
  }

  doLoopDsnBayes002() {
    var resAccept = 1;
    var resReject = 1;
    var valAccept = 0;
    var valReject = 0;
    var arrAccept = [];
    var arrReject = [];

    this.tmviewhistorykriteriaApi.find(
      { where: { and: [{ hasil: 1 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] } }
    ).subscribe(dataHisKriteriaA => {
      // //console.log(dataHisKriteriaA.length, 'ddd');
      valAccept = dataHisKriteriaA.length;
      //console.log(valAccept, 'valAccept');

      this.tmviewhistorykriteriaApi.find(
        { where: { and: [{ hasil: 0 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] } }
      ).subscribe(dataHisKriteriaR => {
        //console.log(dataHisKriteriaR.length, 'dddR');
        valReject = dataHisKriteriaR.length;
        console.log(valReject, 'valReject');

        this.tmviewhistorykriteriaApi.find(
          { where: { and: [{ hasil: 1 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
        ).subscribe(dataHisKriteriaAC1 => {
          //console.log(dataHisKriteriaAC1.length, 'dddAC1');
          arrAccept.push(dataHisKriteriaAC1.length);

          this.tmviewhistorykriteriaApi.find(
            { where: { and: [{ hasil: 0 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
          ).subscribe(dataHisKriteriaRC1 => {
            //console.log(dataHisKriteriaRC1.length, 'dddRRC1');
            arrReject.push(dataHisKriteriaRC1.length);

            this.tmviewhistorykriteriaApi.find(
              { where: { and: [{ hasil: 1 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
            ).subscribe(dataHisKriteriaAC2 => {
              //console.log(dataHisKriteriaAC2.length, 'dddAC2');
              arrAccept.push(dataHisKriteriaAC2.length);

              this.tmviewhistorykriteriaApi.find(
                { where: { and: [{ hasil: 0 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
              ).subscribe(dataHisKriteriaRC2 => {
                //console.log(dataHisKriteriaRC2.length, 'dddRC2');
                arrReject.push(dataHisKriteriaRC2.length);

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaAC3 => {
                  //console.log(dataHisKriteriaAC3.length, 'dddAC3');
                  arrAccept.push(dataHisKriteriaAC3.length);

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaRC3 => {
                    //console.log(dataHisKriteriaRC3.length, 'dddRC3');
                    arrReject.push(dataHisKriteriaRC3.length);

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC4 => {
                      //console.log(dataHisKriteriaAC4.length, 'dddAC4');
                      arrAccept.push(dataHisKriteriaAC4.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC4 => {
                        //console.log(dataHisKriteriaRC4.length, 'dddRC4');
                        arrReject.push(dataHisKriteriaRC4.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC5 => {
                          //console.log(dataHisKriteriaAC5.length, 'dddAC5');
                          arrAccept.push(dataHisKriteriaAC5.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC5 => {
                            //console.log(dataHisKriteriaRC5.length, 'dddRC5');
                            arrReject.push(dataHisKriteriaRC5.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }, { periode: this.arrMhsBayes[this.idxMhsBayes]['periode'] }] } }
                            ).subscribe(dataKuotaDsn => {
                              console.log(dataKuotaDsn.length, 'dataKuotaDsn');

                              console.log(arrAccept, 'arrAccept');
                              console.log(arrReject, 'arrRejectarrReject');
                              for (let b = 0; b < arrAccept.length; b++) {
                                resAccept *= (arrAccept[b] / valAccept);
                              }
                              for (let c = 0; c < arrReject.length; c++) {
                                resReject *= (arrReject[c] / valReject);
                              }
                              console.log(valAccept, 'valAccept', resAccept, 'resAccept', valReject, 'valReject', resReject, 'resReject');
                              var bobottemp = (resAccept / resReject) * (this.max_kuotaBayes - dataKuotaDsn.length);
                              console.log(bobottemp, 'lalalalaa');
                              // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                              this.tbHistoriKlasifikasiApi.find({
                                where: {
                                  idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                  idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                }
                              }).subscribe(tra => {
                                console.log(tra.length, 'traaaaaaaaaaa');
                                bobottemp = isNaN(bobottemp) ? 0 : bobottemp;
                                if (tra.length) {
                                  this.tbHistoriKlasifikasiApi.updateAll({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                  }, {
                                      bobot: bobottemp
                                    }).subscribe(hasil => {
                                      //this.doProsesDSN();
                                      if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        console.log("selesai");
                                      } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        this.idxMhsBayes += 1;
                                        this.doLoopMhsBayes002();
                                      } else {
                                        this.idxDsnBayes += 1;
                                        this.doLoopDsnBayes002();
                                      }
                                      console.log('sukses update cuy');
                                    });
                                } else {
                                  this.tbHistoriKlasifikasiApi.create({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'],
                                    bobot: bobottemp,
                                    hasil: 0,
                                  }).subscribe(res => {
                                    if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      console.log("selesai");
                                    } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      this.idxMhsBayes += 1;
                                      this.doLoopMhsBayes002();
                                    } else {
                                      this.idxDsnBayes += 1;
                                      this.doLoopDsnBayes002();
                                    }
                                    console.log('sukses insert cuy');
                                  })
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }



  /**
  ----------------------------------------try bayes 00 3 ----------------------------------------
  currentperiode=2017
  this.max_kuotaBayes = Math.ceil(mhsPrd.length/dsnPrd.length)
  valAccept => where: { and: [{ hasil: 1 }, { proses: 1 }] }
  valReject => where: { and: [{ hasil: 0 }, { proses: 1 }] }
  bobottemp = (resAccept / resReject)*((this.max_kuotaBayes-dataKuotaDsn.length)/this.max_kuotaBayes-dataKuotaDsn.length);
  */

  loadMhsBayes003() {
    var currentperiode = 2017;
    this.tmMahasiswaApi.find(
      { where: { periode: currentperiode } }
    ).subscribe(mhsPrd => {
      this.tmDosenApi.find(
      ).subscribe(dsnPrd => {
        this.max_kuotaBayes = Math.ceil(mhsPrd.length / dsnPrd.length);
        this.max_kuotaBayes = isNaN(this.max_kuotaBayes) ? 0 : this.max_kuotaBayes;
        this.tmMahasiswaApi.find(
          { where: { and: [{ periode: currentperiode }, { proses: 0 }] } }
        ).subscribe(val => {
          this.arrMhsBayes = val;
          this.idxMhsBayes = 0;
          this.doLoopMhsBayes003();
        });
      });
    });
  }

  doLoopMhsBayes003() {
    this.tmDosenApi.find().subscribe(valq => {
      this.arrDsnBayes = valq;
      this.idxDsnBayes = 0;
      this.doLoopDsnBayes003();
    });
  }

  doLoopDsnBayes003() {
    var resAccept = 1;
    var resReject = 1;
    var valAccept = 0;
    var valReject = 0;
    var arrAccept = [];
    var arrReject = [];

    this.tmviewhistorykriteriaApi.find(
      { where: { and: [{ hasil: 1 }, { proses: 1 }] } }
    ).subscribe(dataHisKriteriaA => {
      // //console.log(dataHisKriteriaA.length, 'ddd');
      valAccept = dataHisKriteriaA.length;
      //console.log(valAccept, 'valAccept');

      this.tmviewhistorykriteriaApi.find(
        { where: { and: [{ hasil: 0 }, { proses: 1 }] } }
      ).subscribe(dataHisKriteriaR => {
        //console.log(dataHisKriteriaR.length, 'dddR');
        valReject = dataHisKriteriaR.length;
        console.log(valReject, 'valReject');

        this.tmviewhistorykriteriaApi.find(
          { where: { and: [{ hasil: 1 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
        ).subscribe(dataHisKriteriaAC1 => {
          //console.log(dataHisKriteriaAC1.length, 'dddAC1');
          arrAccept.push(dataHisKriteriaAC1.length);

          this.tmviewhistorykriteriaApi.find(
            { where: { and: [{ hasil: 0 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
          ).subscribe(dataHisKriteriaRC1 => {
            //console.log(dataHisKriteriaRC1.length, 'dddRRC1');
            arrReject.push(dataHisKriteriaRC1.length);

            this.tmviewhistorykriteriaApi.find(
              { where: { and: [{ hasil: 1 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
            ).subscribe(dataHisKriteriaAC2 => {
              //console.log(dataHisKriteriaAC2.length, 'dddAC2');
              arrAccept.push(dataHisKriteriaAC2.length);

              this.tmviewhistorykriteriaApi.find(
                { where: { and: [{ hasil: 0 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
              ).subscribe(dataHisKriteriaRC2 => {
                //console.log(dataHisKriteriaRC2.length, 'dddRC2');
                arrReject.push(dataHisKriteriaRC2.length);

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaAC3 => {
                  //console.log(dataHisKriteriaAC3.length, 'dddAC3');
                  arrAccept.push(dataHisKriteriaAC3.length);

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaRC3 => {
                    //console.log(dataHisKriteriaRC3.length, 'dddRC3');
                    arrReject.push(dataHisKriteriaRC3.length);

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC4 => {
                      //console.log(dataHisKriteriaAC4.length, 'dddAC4');
                      arrAccept.push(dataHisKriteriaAC4.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC4 => {
                        //console.log(dataHisKriteriaRC4.length, 'dddRC4');
                        arrReject.push(dataHisKriteriaRC4.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC5 => {
                          //console.log(dataHisKriteriaAC5.length, 'dddAC5');
                          arrAccept.push(dataHisKriteriaAC5.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC5 => {
                            //console.log(dataHisKriteriaRC5.length, 'dddRC5');
                            arrReject.push(dataHisKriteriaRC5.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }, { periode: this.arrMhsBayes[this.idxMhsBayes]['periode'] }] } }
                            ).subscribe(dataKuotaDsn => {
                              console.log(dataKuotaDsn.length, 'dataKuotaDsn');

                              console.log(arrAccept, 'arrAccept');
                              console.log(arrReject, 'arrRejectarrReject');
                              for (let b = 0; b < arrAccept.length; b++) {
                                resAccept *= (arrAccept[b] / valAccept);
                              }
                              for (let c = 0; c < arrReject.length; c++) {
                                resReject *= (arrReject[c] / valReject);
                              }
                              console.log(valAccept, 'valAccept', resAccept, 'resAccept', valReject, 'valReject', resReject, 'resReject');
                              var bobottemp = (resAccept / resReject) * ((this.max_kuotaBayes - dataKuotaDsn.length) / this.max_kuotaBayes - dataKuotaDsn.length);
                              console.log(bobottemp, 'lalalalaa');
                              // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                              this.tbHistoriKlasifikasiApi.find({
                                where: {
                                  idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                  idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                }
                              }).subscribe(tra => {
                                console.log(tra.length, 'traaaaaaaaaaa');
                                bobottemp = isNaN(bobottemp) ? 0 : bobottemp;
                                if (tra.length) {
                                  this.tbHistoriKlasifikasiApi.updateAll({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                  }, {
                                      bobot: bobottemp
                                    }).subscribe(hasil => {
                                      //this.doProsesDSN();
                                      if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        console.log("selesai");
                                      } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        this.idxMhsBayes += 1;
                                        this.doLoopMhsBayes003();
                                      } else {
                                        this.idxDsnBayes += 1;
                                        this.doLoopDsnBayes003();
                                      }
                                      console.log('sukses update cuy');
                                    });
                                } else {
                                  this.tbHistoriKlasifikasiApi.create({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'],
                                    bobot: bobottemp,
                                    hasil: 0,
                                  }).subscribe(res => {
                                    if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      console.log("selesai");
                                    } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      this.idxMhsBayes += 1;
                                      this.doLoopMhsBayes003();
                                    } else {
                                      this.idxDsnBayes += 1;
                                      this.doLoopDsnBayes003();
                                    }
                                    console.log('sukses insert cuy');
                                  })
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }


  /**
  ----------------------------------------try bayes 00 4 ----------------------------------------
  currentperiode=2017
  this.max_kuotaBayes = Math.ceil(mhsPrd.length/dsnPrd.length)
  valAccept => where: { and: [{ hasil: 1 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] }
  valReject => where: { and: [{ hasil: 0 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] }
  bobottemp = (resAccept / resReject)*(this.max_kuotaBayes-dataKuotaDsn.length);
  */

  loadMhsBayes004() {
    var currentperiode = 2017;
    this.tmMahasiswaApi.find(
      { where: { periode: currentperiode } }
    ).subscribe(mhsPrd => {
      this.tmDosenApi.find(
      ).subscribe(dsnPrd => {
        this.max_kuotaBayes = Math.ceil(mhsPrd.length / dsnPrd.length);
        this.max_kuotaBayes = isNaN(this.max_kuotaBayes) ? 0 : this.max_kuotaBayes;
        this.tmMahasiswaApi.find(
          { where: { and: [{ periode: currentperiode }, { proses: 0 }] } }
        ).subscribe(val => {
          this.arrMhsBayes = val;
          this.idxMhsBayes = 0;
          this.doLoopMhsBayes004();
        });
      });
    });
  }

  doLoopMhsBayes004() {
    this.tmDosenApi.find().subscribe(valq => {
      this.arrDsnBayes = valq;
      this.idxDsnBayes = 0;
      this.doLoopDsnBayes004();
    });
  }

  doLoopDsnBayes004() {
    var resAccept = 1;
    var resReject = 1;
    var valAccept = 0;
    var valReject = 0;
    var arrAccept = [];
    var arrReject = [];

    this.tmviewhistorykriteriaApi.find(
      { where: { and: [{ hasil: 1 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] } }
    ).subscribe(dataHisKriteriaA => {
      // //console.log(dataHisKriteriaA.length, 'ddd');
      valAccept = dataHisKriteriaA.length;
      //console.log(valAccept, 'valAccept');

      this.tmviewhistorykriteriaApi.find(
        { where: { and: [{ hasil: 0 }, { proses: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }] } }
      ).subscribe(dataHisKriteriaR => {
        //console.log(dataHisKriteriaR.length, 'dddR');
        valReject = dataHisKriteriaR.length;
        console.log(valReject, 'valReject');

        this.tmviewhistorykriteriaApi.find(
          { where: { and: [{ hasil: 1 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
        ).subscribe(dataHisKriteriaAC1 => {
          //console.log(dataHisKriteriaAC1.length, 'dddAC1');
          arrAccept.push(dataHisKriteriaAC1.length);

          this.tmviewhistorykriteriaApi.find(
            { where: { and: [{ hasil: 0 }, { idPendidikan: this.arrDsnBayes[this.idxDsnBayes]['idPendidikan'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
          ).subscribe(dataHisKriteriaRC1 => {
            //console.log(dataHisKriteriaRC1.length, 'dddRRC1');
            arrReject.push(dataHisKriteriaRC1.length);

            this.tmviewhistorykriteriaApi.find(
              { where: { and: [{ hasil: 1 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
            ).subscribe(dataHisKriteriaAC2 => {
              //console.log(dataHisKriteriaAC2.length, 'dddAC2');
              arrAccept.push(dataHisKriteriaAC2.length);

              this.tmviewhistorykriteriaApi.find(
                { where: { and: [{ hasil: 0 }, { idFungsional: this.arrDsnBayes[this.idxDsnBayes]['idFungsional'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
              ).subscribe(dataHisKriteriaRC2 => {
                //console.log(dataHisKriteriaRC2.length, 'dddRC2');
                arrReject.push(dataHisKriteriaRC2.length);

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaAC3 => {
                  //console.log(dataHisKriteriaAC3.length, 'dddAC3');
                  arrAccept.push(dataHisKriteriaAC3.length);

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { kategori1: this.arrMhsBayes[this.idxMhsBayes]['kategori1'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaRC3 => {
                    //console.log(dataHisKriteriaRC3.length, 'dddRC3');
                    arrReject.push(dataHisKriteriaRC3.length);

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC4 => {
                      //console.log(dataHisKriteriaAC4.length, 'dddAC4');
                      arrAccept.push(dataHisKriteriaAC4.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { kategori2: this.arrMhsBayes[this.idxMhsBayes]['kategori2'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC4 => {
                        //console.log(dataHisKriteriaRC4.length, 'dddRC4');
                        arrReject.push(dataHisKriteriaRC4.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC5 => {
                          //console.log(dataHisKriteriaAC5.length, 'dddAC5');
                          arrAccept.push(dataHisKriteriaAC5.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { kategori3: this.arrMhsBayes[this.idxMhsBayes]['kategori3'] }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC5 => {
                            //console.log(dataHisKriteriaRC5.length, 'dddRC5');
                            arrReject.push(dataHisKriteriaRC5.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'] }, { proses: 1 }, { periode: this.arrMhsBayes[this.idxMhsBayes]['periode'] }] } }
                            ).subscribe(dataKuotaDsn => {
                              console.log(dataKuotaDsn.length, 'dataKuotaDsn');

                              console.log(arrAccept, 'arrAccept');
                              console.log(arrReject, 'arrRejectarrReject');
                              for (let b = 0; b < arrAccept.length; b++) {
                                resAccept *= (arrAccept[b] / valAccept);
                              }
                              for (let c = 0; c < arrReject.length; c++) {
                                resReject *= (arrReject[c] / valReject);
                              }
                              console.log(valAccept, 'valAccept', resAccept, 'resAccept', valReject, 'valReject', resReject, 'resReject');
                              var bobottemp = (resAccept / resReject) * ((this.max_kuotaBayes - dataKuotaDsn.length) / this.max_kuotaBayes - dataKuotaDsn.length);
                              console.log(bobottemp, 'lalalalaa');
                              // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                              this.tbHistoriKlasifikasiApi.find({
                                where: {
                                  idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                  idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                }
                              }).subscribe(tra => {
                                console.log(tra.length, 'traaaaaaaaaaa');
                                bobottemp = isNaN(bobottemp) ? 0 : bobottemp;
                                if (tra.length) {
                                  this.tbHistoriKlasifikasiApi.updateAll({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id']
                                  }, {
                                      bobot: bobottemp
                                    }).subscribe(hasil => {
                                      //this.doProsesDSN();
                                      if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        console.log("selesai");
                                      } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                        this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                        this.idxMhsBayes += 1;
                                        this.doLoopMhsBayes004();
                                      } else {
                                        this.idxDsnBayes += 1;
                                        this.doLoopDsnBayes004();
                                      }
                                      console.log('sukses update cuy');
                                    });
                                } else {
                                  this.tbHistoriKlasifikasiApi.create({
                                    idMahasiswa: this.arrMhsBayes[this.idxMhsBayes]['id'],
                                    idDosen: this.arrDsnBayes[this.idxDsnBayes]['id'],
                                    bobot: bobottemp,
                                    hasil: 0,
                                  }).subscribe(res => {
                                    if (this.idxMhsBayes == this.arrMhsBayes.length - 1 && this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      console.log("selesai");
                                    } else if (this.idxDsnBayes == this.arrDsnBayes.length - 1) {
                                      this.UpdateHasil(this.arrMhsBayes[this.idxMhsBayes]['id'], true);
                                      this.idxMhsBayes += 1;
                                      this.doLoopMhsBayes004();
                                    } else {
                                      this.idxDsnBayes += 1;
                                      this.doLoopDsnBayes004();
                                    }
                                    console.log('sukses insert cuy');
                                  })
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }



}
