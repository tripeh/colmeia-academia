import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the TrainingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  public loading: boolean = true;
  public trainings: any;
  
  private api: string = 'http://colmeia.tripeh.com.br/api/v1';
  private path_image: string = 'http://colmeia.tripeh.com.br/public/images/';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient, 
    private toastCtrl: ToastController,
    private network: Network
  ) {}

  ionViewDidEnter()
  {
    //Check connection
    if(this.network.type != 'none')
    {

      //Get trainings from API
      this.http.get(this.api+'/training', {})
      .subscribe(data => {

        //Success, process data.
        this.trainings = data;

      }, (error) => {
        
        //Error, call alert.
        let toast = this.toastCtrl.create({
          message: 'Ops! Ocorreu um erro ao resgatar os treinos.',
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();

      }, () => {

        //Set loading to false (Hide)
        this.loading = false;

      });
    }
    else{

      //Set loading to false
      this.loading = false;

      //Error, call alert.
      let toast = this.toastCtrl.create({
        message: 'Para acessar esta área é necessário uma conexão com a internet.',
        duration: 3000,
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      //After over duration or press "ok" button, redirect to home again.
      toast.onDidDismiss(() => {
        this.goToHome();
      });
      toast.present();
      
    }
  }

  goToHome(){
    this.navCtrl.parent.select(0);
  }

}
