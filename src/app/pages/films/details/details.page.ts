import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/api.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  film: Movie = null;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.film = this.activeRoute.snapshot.data.film;
    console.log(this.activeRoute.snapshot, this.film);
  }

}
