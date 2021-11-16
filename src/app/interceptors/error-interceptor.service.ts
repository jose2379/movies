import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  currentReq: HttpRequest<any>;

  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentReq = req;
    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    )
  }

  private errorHandler(error: HttpErrorResponse){
    if (error.status === 0) {
      this.route.navigateByUrl('error')
    }
    return throwError(`Error: ${error.status}. No se ha podido obtener los datos de la url: ${this.currentReq.url}`);
  }
}
