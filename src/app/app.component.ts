import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MenuOption } from './interfaces/menu.interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menuOptions: Observable<MenuOption[]>;

  constructor(private translate: TranslateService, private dataService: DataService) {
    this.translate.setDefaultLang('es');
    this.menuOptions = this.dataService.getMenuOptions();
  }
  onSplitPaneVisible(event): void {
    // TODO => gestionar una variable global para mostrar el icono de menú del header
  }
}
