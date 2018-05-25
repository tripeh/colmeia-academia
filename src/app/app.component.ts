import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;
  private api: string = 'http://colmeia.tripeh.com.br/api/v1';

  constructor(
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen, 
      public push: Push, 
      public http: HttpClient, 
      private network: Network,
      private fcm: FCM
    ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      setTimeout(() => {
        this.pushsetup();
      }, 2000);
    });
  }

  pushsetup() {

    const options: PushOptions = {};
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    //Get Token
    this.fcm.getToken().then(token => {
      if(this.network.type != 'none')
      {
        this.http.post(this.api+'/token', {token})
          .subscribe(data => {
            console.log(data);
          }, (error) => {
            console.log(error);            
          });
      }
    });
  }
}
