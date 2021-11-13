import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/api.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  movie: Movie = null;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.movie = this.activeRoute.snapshot.data.film;
  }

}
