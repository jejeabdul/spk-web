/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { AuthApi } from './services/custom/Auth';
import { RolemappingApi } from './services/custom/Rolemapping';
import { ContainerApi } from './services/custom/Container';
import { TmPegawaiApi } from './services/custom/TmPegawai';
import { TbUserApi } from './services/custom/TbUser';
import { TbCalendarApi } from './services/custom/TbCalendar';
import { TbChatroomApi } from './services/custom/TbChatroom';
import { TbChatusertoApi } from './services/custom/TbChatuserto';
import { TbChatuserApi } from './services/custom/TbChatuser';
import { TbChatroomlistApi } from './services/custom/TbChatroomlist';
import { TbChatroomdetailApi } from './services/custom/TbChatroomdetail';
import { TbDetailKomptensiDosenApi } from './services/custom/TbDetailKomptensiDosen';
import { TmFungsionalDosenApi } from './services/custom/TmFungsionalDosen';
import { TmKuotaApi } from './services/custom/TmKuota';
import { TmKompetensiDosenApi } from './services/custom/TmKompetensiDosen';
import { TmPendidikanDosenApi } from './services/custom/TmPendidikanDosen';
import { TbKriteriaApi } from './services/custom/TbKriteria';
import { TbHistoriKlasifikasiApi } from './services/custom/TbHistoriKlasifikasi';
import { TmDosenApi } from './services/custom/TmDosen';
import { TmMahasiswaApi } from './services/custom/TmMahasiswa';
import { TmviewhistorykriteriaApi } from './services/custom/Tmviewhistorykriteria';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        AuthApi,
        RolemappingApi,
        ContainerApi,
        TmPegawaiApi,
        TbUserApi,
        TbCalendarApi,
        TbChatroomApi,
        TbChatusertoApi,
        TbChatuserApi,
        TbChatroomlistApi,
        TbChatroomdetailApi,
        TbDetailKomptensiDosenApi,
        TmFungsionalDosenApi,
        TmKuotaApi,
        TmKompetensiDosenApi,
        TmPendidikanDosenApi,
        TbKriteriaApi,
        TbHistoriKlasifikasiApi,
        TmDosenApi,
        TmMahasiswaApi,
        TmviewhistorykriteriaApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
