import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class CursosProvider {

  private serverUrl = "https://konviva-clone-4dv9tc.turbo360-vertex.com/";
  private endpoint = this.serverUrl + "/api/cursos";
  public fcmToken = '';

  constructor(public http: Http) {
  }

  public getCursos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.endpoint)
        .subscribe(
          response => {
            resolve(response.json());
          },
          error => {
            console.log(error);
            reject("Houve um erro ao carregar os seus cursos :(");
          });
    });
  }

  public concluirCurso(cursoId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.endpoint, {cursoId, fcmToken: this.fcmToken})
        .subscribe(
          () => {
            resolve();
          },
          error => {
            console.log(error);
            reject('Não foi possível enviar uma notificação :(');
          }
        );
    });
  }
}
