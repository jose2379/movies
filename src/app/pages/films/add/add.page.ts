import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Company, Movie } from 'src/app/interfaces/api.interface';
import { SelectOption } from 'src/app/interfaces/utils.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  @Input() movie: Movie;
  headerTitle: string;

  IS_UPDATING_MOVIE = false;
  prefixTitle: string
  movieCompany: Company;
  movieForm = new FormGroup({});
  actorOptions: SelectOption[] = [];
  companiesList: Company[] = [];
  companyOptions: SelectOption[] = [];

  constructor(
    public translate: TranslateService,
    private modalController: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.IS_UPDATING_MOVIE = Boolean(this.movie);
    const titleControl = new FormControl('', Validators.required)
    this.movieForm.addControl('title', titleControl);
    titleControl.valueChanges.subscribe(value => this.creaTitle(value));
    this.movieForm.addControl('poster', new FormControl());
    this.movieForm.addControl('newGenre', new FormControl());
    this.movieForm.addControl('genre', new FormArray([]));
    this.movieForm.addControl('actors', new FormControl());
    this.movieForm.addControl('company', new FormControl());
    this.movieForm.addControl('year', new FormControl());
    this.movieForm.addControl('duration', new FormControl());
    this.movieForm.addControl('imdbRating', new FormControl());

    if (this.IS_UPDATING_MOVIE) {
      this.prefixTitle = this.translate.instant('pages.add.prefix_title-edit');
      this.movieForm.patchValue({
        title: this.movie.title,
        poster: this.movie.poster,
        year: this.movie.year,
        duration: this.movie.duration,
        imdbRating: this.movie.imdbRating
      })
      this.creaTitle(this.movie.title);
      this.movie.genre.forEach(genre => this.addGenres(genre));
    } else {
      this.prefixTitle = this.translate.instant('pages.add.prefix_title-add');
      this.creaTitle('');
    }

    this.dataService.getActors().subscribe(actors => {
      this.actorOptions = actors.map(actor => {
        return {
          key: actor.id,
          value: `${actor.first_name} ${actor.last_name}`
        }
      });
      this.movieForm.get('actors').setValue(this.movie?.actors);
    });
    this.dataService.getCompanies().subscribe(companies => {
      this.companiesList = companies;
      this.companyOptions = companies.map(company => {
        return {
          key: company.id,
          value: company.name
        }
      })
      this.movieCompany = companies.find(company => company.movies.includes(this.movie?.id));
      if (this.movieCompany) {
        this.movieForm.get('company').setValue(this.movieCompany.id);
      }
    });
  }
  onSubmit() {
    const {newGenre, company, ...newMovie} = this.movieForm.value;
    const body=JSON.stringify(newMovie);
    const companyIdUpdating = this.movieForm.get('company').value;
    if (this.IS_UPDATING_MOVIE) {
      this.dataService.updateMovie(body, this.movie.id);
      if (this.movieCompany && this.movieCompany.id !== companyIdUpdating) {
        this.movieCompany.movies = this.movieCompany.movies.filter(movie => movie !== this.movie.id);
        const companyBody = JSON.stringify(this.movieCompany);
        this.dataService.updateCompany(companyBody, this.movieCompany.id);
        this.updateSelectedCompany(companyIdUpdating);
      }
    } else {
      this.dataService.addMovie(body);
      this.updateSelectedCompany(companyIdUpdating);
    }
  }
  onModalClose():void {
    this.modalController.dismiss();
  }
  onAddGenre():void {
    const controlGenres = this.movieForm.get('newGenre');
    if(controlGenres.value) {
      this.addGenres(controlGenres.value)
    }
    controlGenres.reset();   
  }
  deleteGenre(index: number):void {
    this.genres.controls.splice(index, 1);
  }
  get genres() {
    return this.movieForm.get('genre') as FormArray;
  }

  trackByFunction(index: number) :number {
    return index;
  }
  
  private updateSelectedCompany(companyIdUpdating: number) {
    const newSelectedCompany = this.companiesList.find(company => company.id === companyIdUpdating);
    if (newSelectedCompany) {
      newSelectedCompany.movies.push(this.movie.id);
      const newSelectedCompanyBody = JSON.stringify(newSelectedCompany);
      this.dataService.updateCompany(newSelectedCompanyBody, newSelectedCompany.id);
    }
    
  }
  private creaTitle(value:string) {
    this.headerTitle = `${this.prefixTitle} ${value}`;
  }
  private addGenres(value: string) {
    this.genres.push(new FormControl(value));
  }

}
