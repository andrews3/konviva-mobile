import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class UtilProvider {

  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  public showToast(message, duration?, position?, showCloseButton?) {
    if (!duration)
      duration = 3000;
    if (!position)
      position = 'bottom';

    if (showCloseButton) {
      duration = 10000;
    }

    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showCloseButton,
      closeButtonText: 'Entendi'
    }).present();
  }

  public getLoading(message?, dismissOnPageChange?, timeout?) {
    if (!message)
      message = 'Carregando...';

    if (!timeout)
      timeout = 12000;

    return this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: dismissOnPageChange,
      duration: timeout
    });
  }
}
