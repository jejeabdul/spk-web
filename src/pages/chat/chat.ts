import { TbChatroomlistApi } from './../../shared/sdk/services/custom/TbChatroomlist';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public tbChatroomlistApi: TbChatroomlistApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
