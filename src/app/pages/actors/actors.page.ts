import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.page.html',
  styleUrls: ['./actors.page.scss'],
})
export class ActorsPage implements OnInit {

  constructor(public trasnlate: TranslateService) { }

  ngOnInit() {
  }

}
