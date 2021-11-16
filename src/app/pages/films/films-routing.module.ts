import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from 'src/app/services/data-resolver.service';

import { FilmsPage } from './films.page';

const routes: Routes = [
  {
    path: '',
    component: FilmsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: ':pathSection/:id',
    resolve: {
      film: DataResolverService
    },
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsPageRoutingModule {}
