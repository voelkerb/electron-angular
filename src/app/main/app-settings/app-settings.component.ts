import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from 'app/services/app-settings.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-management',
    templateUrl: './app-settings.component.html',
    styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent {
    subscriptions = []
    languages = {
        de: "Deutsch",
        en: "English"
    }

    settingsForm: FormGroup = null;

    constructor(settings: AppSettingsService) {
        this.settingsForm = settings.settings;
    }



}
