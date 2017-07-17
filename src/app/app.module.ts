import { ChangepasswordPage } from './../pages/settings/changepassword/changepassword';
import { MyProfilePage } from './../pages/settings/my-profile/my-profile';
import { FormEventPage } from './../pages/my-calendar/form-event/form-event';
import { SignInPage } from './../pages/sign-in/sign-in';
import { KlasifikasiPage } from './../pages/klasifikasi/klasifikasi';
import { EditDosenPage } from './../pages/dosen/edit-dosen/edit-dosen';
import { AddDosenPage } from './../pages/dosen/add-dosen/add-dosen';
import { EditMhsPage } from './../pages/mahasiswa/edit-mhs/edit-mhs';
import { AddMhsPage } from './../pages/mahasiswa/add-mhs/add-mhs';
import { ChatPage } from './../pages/chat/chat';
import { MyCalendarPage } from './../pages/my-calendar/my-calendar';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { SettingsPage } from './../pages/settings/settings';
import { MahasiswaPage } from './../pages/mahasiswa/mahasiswa';
import { DosenPage } from './../pages/dosen/dosen';
import { MenuPage } from './../pages/menu/menu';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../shared/sdk/index';
import { Moment } from './../components/pipes/moment';

@NgModule({
  declarations: [
    MyApp,
    Moment,
    HomePage,
    MenuPage,
    DosenPage,
    MahasiswaPage,
    SettingsPage,
    MyCalendarPage,
    CalendarComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    ChatPage,
    AddMhsPage,
    EditMhsPage,
    AddDosenPage,
    EditDosenPage,
    KlasifikasiPage,
    SignInPage,
    FormEventPage,
    MyProfilePage,
    ChangepasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    IonicStorageModule.forRoot(),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    DosenPage,
    MahasiswaPage,
    SettingsPage,
    MyCalendarPage,
    CalendarComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    ChatPage,
    AddMhsPage,
    EditMhsPage,
    AddDosenPage,
    EditDosenPage,
    KlasifikasiPage,
    SignInPage,
    FormEventPage,
    MyProfilePage,
    ChangepasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
