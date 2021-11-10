import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActorsPageRoutingModule } from './actors-routing.module';

import { ActorsPage } from './actors.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActorsPageRoutingModule,
    SharedModule
  ],
  declarations: [ActorsPage]
})
export class ActorsPageModule {}
