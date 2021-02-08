import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarFeedbackPageRoutingModule } from './criar-feedback-routing.module';

import { CriarFeedbackPage } from './criar-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarFeedbackPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CriarFeedbackPage]
})
export class CriarFeedbackPageModule {}
