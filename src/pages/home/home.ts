import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Curso} from "../../models/curso";
import {UtilProvider} from "../../providers/util/util";
import {CursosProvider} from "../../providers/cursos/cursos";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private cursosObject: any = {
    cursos: <Array<Curso>>[]
  };
  private loading;

  constructor(private navCtrl: NavController,
              private util: UtilProvider,
              private cursosProvider: CursosProvider) {
  }

  ionViewDidLoad() {
    this.loadCursos();
  }

  loadCursos(refresher?) {
    if (!refresher) {
      this.loading = true;
    }

    this.cursosProvider.getCursos()
      .then(cursos => {
        let newCursos = [];
        cursos.forEach(curso => newCursos.push(new Curso(curso)));
        this.cursosObject.cursos = newCursos;
        if (refresher) {
          refresher.complete();
        } else {
          this.loading = false;
        }
      })
      .catch(error => {
        this.util.showToast(error);
        if (refresher) {
          refresher.complete();
        } else {
          this.loading = false;
        }
      });
  }

  toggleCursosContainer() {
    document.getElementById('cursos-arrow').classList.toggle('rotate');
    document.getElementById('cursos-container').classList.toggle('closed');
  }

  getCursosInnerHeight() {
    return {'height': document.getElementById('inner-cursos-container').clientHeight + 'px'};
  }

  openCurso(curso: Curso) {
    this.navCtrl.push('CursoDetailPage', {curso});
  }
}
