import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TmDosenApi } from './../../shared/sdk/services/custom/TmDosen';
import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  jmlMhs: any;
  jmlDsn: any;
  constructor(
    public navCtrl: NavController,
    public tmDosenApi: TmDosenApi,
    public tmMahasiswaApi: TmMahasiswaApi,
  ) {
    this.tmMahasiswaApi.find().subscribe(val => {
      this.jmlMhs = val.length;
    });
    this.tmDosenApi.find().subscribe(val => {
      this.jmlDsn = val.length;
    });
  }
}
