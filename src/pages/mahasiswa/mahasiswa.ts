import { EditMhsPage } from './edit-mhs/edit-mhs';
import { AddMhsPage } from './../mahasiswa/add-mhs/add-mhs';
import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the MahasiswaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-mahasiswa',
  templateUrl: 'mahasiswa.html',
})
export class MahasiswaPage {
  items: any;
  textSearchMember: any = '';
  start_member: number = 0;
  limit_member: number = 6;
  stop_member: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi,
    public events: Events
  ) {
    this.getDataMhs('', '');
    this.items = [];
    // add
    this.events.subscribe('user:mhsadd', (val) => {
      this.getDataMhs('', '');
      this.items = [];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MahasiswaPage');
  }

  getDataMhs(type, val) {
    if (val !== '') {
      this.tmMahasiswaApi.find({
        where: {
          or: [
            { nim: { like: '%' + val + '%' } },
            { nama: { like: '%' + val + '%' } }
          ]

        }, order: "nama ASC",
        limit: this.limit_member,
        skip: this.start_member
      }).subscribe(value => {
        if (value.length !== 0) {
          for (let item of value) {
            this.items.push(item);
          }
        } else {
          this.stop_member = true;
        }
        if (type !== '') {
          type.complete();
        }
      });
    } else {
      this.tmMahasiswaApi.find({
        order: "nama ASC",
        limit: this.limit_member,
        skip: this.start_member
      }).subscribe(value => {
        if (value.length !== 0) {
          for (let item of value) {
            this.items.push(item);
          }
        } else {
          this.stop_member = true;
        }

        if (type !== '') {
          type.complete();
        }
      });
    }
  }

  doAddMhs() {
    this.navCtrl.push(AddMhsPage);
  }

  doEditMhs(nim) {
    console.log(nim);
    this.navCtrl.push(EditMhsPage, { data: nim });
  }

  // ifinite 
  doInfinite(infiniteScroll) {
    if (!this.stop_member) {
      this.start_member += this.limit_member;
      this.getDataMhs(infiniteScroll, this.textSearchMember);
    } else {
      infiniteScroll.complete();
    }
  }

  searchList(val): any {
    this.start_member = 0;
    this.stop_member = false;
    this.items = [];
    if (typeof val.target.value === "undefined") {
      val.target.value = '';
    }
    this.getDataMhs('', val.target.value);
  }

}
