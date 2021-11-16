import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/api.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {
  skeletonMovies = Array(10);
  movies: Observable<Movie[]>;

  constructor(public translate: TranslateService, private dataService: DataService) { }

  ngOnInit() {
    this.skeletonMovies.fill([]);
    this.skeletonMovies = this.skeletonMovies.map(_ => Array(Math.ceil(Math.random() * 5)));
    this.movies = this.dataService.getMovies();
  }

  trackByMovieFunction(index: number, element: Movie): number {
    return element ? element.id : null;
  }
  trackByGeneroFunction(index: number) :number {
    return index;
  }

}
