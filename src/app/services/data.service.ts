import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuOption } from '../interfaces/menu.interface';
import { Actor, Company, Movie } from '../interfaces/api.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getMenuOptions(): Observable<MenuOption[]>{
    return this.httpClient.get<MenuOption[]>('/assets/data/menu-options.json');
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.apiUrl}/movies`);
  }
  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${environment.apiUrl}/companies`);
  }
  getEstudioWithFilmId(id: number): Observable<Company> {
    return this.getCompanies().pipe(
      map(act => act.find( app => app.movies.includes(id)))
    );
  }
  getActors(): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(`${environment.apiUrl}/actors`);
  }
  getActorsByIds(actorIds?: number[]): Observable<Actor[]> {
    return this.getActors().pipe(
      map(resp => resp.filter( actor => !actorIds ? actor : actorIds.includes(actor.id) ? actor : null))
    );
  }
}
