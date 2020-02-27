import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CursoDetailPage } from './curso-detail';

@NgModule({
  declarations: [
    CursoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CursoDetailPage),
  ],
})
export class CursoDetailPageModule {}
