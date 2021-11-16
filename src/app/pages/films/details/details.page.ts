import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService,
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
    private modalController: ModalController,
    private alertController: AlertController,
    private route: Router
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
    const alertDelete = await this.alertController.create({
      header: this.translate.instant('forms.movies.alert.delete_header'),
      message: this.translate.instant('forms.movies.alert.delete_message'),
      buttons: [
        {
          text: this.translate.instant('forms.buttons.cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('forms.buttons.acept'),
          handler: () => this.confirmDelete(),
          role: 'acept'
        },
      ],
    });
    await alertDelete.present();
  }

  trackByActorFunction(index: number, actor: Actor) :number {
    return actor.id;
  }
  trackByGeneroFunction(index: number) :number {
    return index;
  }
  
  private confirmDelete():void {
    this.dataService.deleteMovie(this.movie.id).subscribe(_ => {
      this.route.navigateByUrl('/films');
    });
  }

}
