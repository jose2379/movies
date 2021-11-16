import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Actor, Movie } from 'src/app/interfaces/api.interface';
import { DataService } from 'src/app/services/data.service';
import { AddPage } from '../add/add.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  movie: Movie = null;
  headerTitle: string;
  actors: Observable<Actor[]>;
  companyName: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.movie = this.activeRoute.snapshot.data.film;
    this.headerTitle = `${this.movie.title} (${this.movie.year})`;
    this.actors = this.dataService.getActorsByIds(this.movie.actors);
    this.dataService.getEstudioWithFilmId(this.movie.id).subscribe(comp => this.companyName = comp?.name);
  }
  async onEditMovie(): Promise<void> {
    const modalEdit = await this.modalController.create({
      component: AddPage,
      backdropDismiss: true,
      componentProps: {
        movie: this.movie
      }
    });
    await modalEdit.present();
  }
  async onDeleteMovie(): Promise<void> {
    console.log('onDeleteMovie');
  }

}
