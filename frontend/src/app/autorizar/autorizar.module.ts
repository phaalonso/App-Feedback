import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutorizarPageRoutingModule } from './autorizar-routing.module';

import { AutorizarPage } from './autorizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutorizarPageRoutingModule
  ],
  declarations: [AutorizarPage]
})
export class AutorizarPageModule {}
