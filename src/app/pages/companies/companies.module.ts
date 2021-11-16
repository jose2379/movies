import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CompaniesPageRoutingModule } from './companies-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { CompaniesPage } from './companies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompaniesPageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [CompaniesPage]
})
export class CompaniesPageModule {}
