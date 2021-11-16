import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  waitMessage: string;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController, private translate: TranslateService, private route: Router) {
    this.translate.get('loader.waitMessage').subscribe(waitMessage => this.waitMessage = waitMessage);
   }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    const pathSection = route.paramMap.get('pathSection');
    let loading: HTMLIonLoadingElement;
    this.loadingController.create({
      message: this.waitMessage
    }).then(res => {
      loading = res;
      loading.present();
    });
    return this.httpClient.get(`${environment.apiUrl}/${pathSection}/${id}`)
        .pipe(
          tap(() => {
            loading.dismiss();
          }),
          catchError(err => {
            loading.dismiss();
            this.route.navigateByUrl('films');
            return throwError(err)
          })
        );
  }
}
