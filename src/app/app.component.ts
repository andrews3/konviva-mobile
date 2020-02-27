import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AndroidFullScreen} from "@ionic-native/android-full-screen";
import {FCM} from "@ionic-native/fcm";
import {CursosProvider} from "../providers/cursos/cursos";
import {LocalNotifications} from "@ionic-native/local-notifications";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'HomePage';

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private androidFullScreen: AndroidFullScreen,
              private fcm: FCM,
              private cursosProvider: CursosProvider,
              private localNotifications: LocalNotifications) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.treatFullScreen();
        this.startFcmTokenListener();
        this.statusBar.backgroundColorByHexString('#555555');
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
      }
    });
  }

  private startFcmTokenListener() {
    this.fcm.getToken().then(response => {
      this.cursosProvider.fcmToken = response;
    });

    this.fcm.onTokenRefresh().subscribe(response => {
      this.cursosProvider.fcmToken = response;
    });

    this.fcm.onNotification().subscribe(notificationData => {
      if (!notificationData.wasTapped) {
        this.localNotifications.schedule({
          title: notificationData.title,
          text: notificationData.body,
          smallIcon: "fcm_push_icon",
          foreground: true,
          group: "notifications",
          groupSummary: true,
          clock: true,
          launch: true,
          id: (Math.random() * 10000),
          autoClear: true,
          priority: 2,
          trigger: {
            at: new Date()
          },
          actions: "click",
          color: "#222",
        });
      }
    });
  }

  private treatFullScreen() {
    if (this.platform.is('android'))
      this.androidFullScreen.isSupported()
        .then(() => this.androidFullScreen.showSystemUI());
  }
}

