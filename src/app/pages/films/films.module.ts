import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmsPageRoutingModule } from './films-routing.module';

import { FilmsPage } from './films.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmsPageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [FilmsPage]
})
export class FilmsPageModule {}
