import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarFeedbackPage } from './criar-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: CriarFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarFeedbackPageRoutingModule {}
