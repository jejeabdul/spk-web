import { RolemappingApi } from './../../shared/sdk/services/custom/Rolemapping';
import { LoopBackAuth } from './../../shared/sdk/services/core/auth.service';
import { MenuPage } from './../menu/menu';
import { AuthApi } from './../../shared/sdk/services/custom/Auth';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SignInPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  public myForm: any = null;
  showpass: any = false;
  values: any = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public authApi: AuthApi,
    public storage: Storage,
    public auth: LoopBackAuth,
    public rolemappingApi: RolemappingApi

  ) {
    this.myForm = fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    // Check is already login or not
    storage.ready().then(() => {
      storage.get('sessionId').then((val) => {
        if (val) {
          this.navCtrl.setRoot(MenuPage);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  onKey(value: string) {
    this.values = value;
  }

  passView(data) {
    if (data == 'showpass') {
      this.showpass = !this.showpass;
    }
  }

  // action login 
  goLogin(val) {
    console.log(val, 111)
    this.authApi.doLogin({
      username: val.username,
      password: val.password
    }).subscribe(value => {
      console.log(value, 777, value.result.id)
      this.storage.set('roleid', value.req[0]['roleId']);
      this.storage.set('sessionId', value.result.id);
      this.storage.set('stuserid', value.val[0].id);
      this.auth.setToken(value.result);
      this.navCtrl.setRoot(MenuPage);
    });
  }
}
