import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {AndroidFullScreen} from "@ionic-native/android-full-screen";
import {CursosProvider} from '../providers/cursos/cursos';
import {HttpModule} from "@angular/http";
import {UtilProvider} from "../providers/util/util";
import {FCM} from "@ionic-native/fcm";
import {Diagnostic} from "@ionic-native/diagnostic";
import {LocalNotifications} from "@ionic-native/local-notifications";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      platforms: {
        ios: {
          backButtonText: 'Voltar'
        }
      }
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    CursosProvider,
    UtilProvider,
    FCM,
    Diagnostic,
    LocalNotifications
  ]
})
export class AppModule {
}
