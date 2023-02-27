import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Renderer2, RendererStyleFlags2, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { unsubscribeAll } from '../shared/functions/unsubscribe';
import { AppSettingsService } from '../services/app-settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  subscriptions = []

  numEvents = 3;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    console.log("welcome in main component");
  }
  
  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }

  logout() {
    this.router.navigate(['/']);
  }
}
