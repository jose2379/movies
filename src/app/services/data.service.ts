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

  POST_OPTIONS = {headers: { 'content-type': 'application/json'}}
  
  getMenuOptions(): Observable<MenuOption[]>{
    return this.httpClient.get<MenuOption[]>('/assets/data/menu-options.json');
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.apiUrl}/movies`);
  }
  updateMovie(body: string, id: number): void {
    this.httpClient.patch(`${environment.apiUrl}/movies/${id}`, body, this.POST_OPTIONS).subscribe();
  }
  addMovie(body: string): void {
    this.httpClient.post(`${environment.apiUrl}/movies`, body, this.POST_OPTIONS).subscribe();
  }
  deleteMovie(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/movies/${id}`, this.POST_OPTIONS);
  }
  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${environment.apiUrl}/companies`);
  }
  updateCompany(body: string, id: number): void {
    this.httpClient.patch(`${environment.apiUrl}/companies/${id}`, body, this.POST_OPTIONS).subscribe();
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
