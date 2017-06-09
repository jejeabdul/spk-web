// import { EditDosenPage } from './edit-dosen/edit-dosen';
import { TmDosenApi } from './../../shared/sdk/services/custom/TmDosen';
import { AddDosenPage } from './add-dosen/add-dosen';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the DosenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dosen',
  templateUrl: 'dosen.html',
})
export class DosenPage {
  items: any;
  textSearchMember: any = '';
  start_member: number = 0;
  limit_member: number = 6;
  stop_member: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tmdosen: TmDosenApi,
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
    
  }

  AddDosen() {
    this.navCtrl.push(AddDosenPage);
  }

  getDataMhs(type, val) {
    if (val !== '') {
      this.tmdosen.find({
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
      this.tmdosen.find({
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

  doInfinite(infiniteScroll) {
    if (!this.stop_member) {
      this.start_member += this.limit_member;
      this.getDataMhs(infiniteScroll, this.textSearchMember);
    } else {
      infiniteScroll.complete();
    }
  }

  // EditDosen(nidn) {
  //   console.log(nidn);
  //   this.navCtrl.push(EditDosenPage, { data: nidn });
  // }

  delete(item){
    console.log(item.id, 'data nidn');
    let idDosen = item.id;
    this.tmdosen.deleteById({
      where:
      { id: idDosen }
    }).subscribe((data)=>{
      console.log(data,'sukses');
    })
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
