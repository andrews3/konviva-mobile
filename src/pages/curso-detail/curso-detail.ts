import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Curso} from "../../models/curso";
import {CursosProvider} from "../../providers/cursos/cursos";

@IonicPage()
@Component({
  selector: 'page-curso-detail',
  templateUrl: 'curso-detail.html',
})
export class CursoDetailPage {

  curso: Curso;

  constructor(public navParams: NavParams,
              private cursosProvider: CursosProvider) {
  }


  ionViewDidLoad() {
    this.showFooter(false, false);

    this.curso = this.navParams.get('curso');

    if (this.curso.getPercent() == '100' && !this.curso.certificateSend)
      setTimeout(() => {
        this.startBtnListener();
        this.showFooter(true, true);
      }, 1000);
  }

  downloadAula(aula, slidingItem) {
    aula.status = 'downloading';
    setTimeout(() => {
      aula.status = 'downloaded';
      slidingItem.close();
    }, 2000);
  }

  showFooter(show, transition?) {
    setTimeout(() => {
      let scrolls = document.getElementsByClassName('scroll-content');
      if (scrolls.length) {
        let scrollContent = scrolls[scrolls.length - 1];
        let footer = document.getElementById('curso-footer');
        if (footer) {
          if (transition) {
            footer.classList.add('transition-all');
            scrollContent.classList.add('transition-all')
          }

          if (show) {
            footer.style.bottom = '0';
            scrollContent.classList.remove('scroll-content-no-footer');
          } else {
            footer.style.bottom = ('-' + footer.offsetHeight + 'px');
            scrollContent.classList.add('scroll-content-no-footer');
          }
        }
      }
    }, 100);
  }

  startBtnListener() {
    const btnFooter = document.getElementById('btn-footer');

    const toggle = () => {
      btnFooter.classList.toggle('active');
    };

    btnFooter.addEventListener('transitionend', toggle);
    btnFooter.addEventListener('click', toggle);
    btnFooter.addEventListener('transitionend', () => {
      btnFooter.classList.add('finished');
      this.curso.certificateSend = true;
      this.cursosProvider.concluirCurso(this.curso._id);
    });
  }
}
