import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuOption } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getMenuOptions(): Observable<MenuOption[]>{
    return this.httpClient.get<MenuOption[]>('/assets/data/menu-options.json');
  }
}
