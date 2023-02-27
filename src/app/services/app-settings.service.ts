import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


export interface AppSettings {
  language: "de" | "en";
  theme: "lightTheme" | "darkTheme" | "customTheme";
}

const DEFAULT_SETTING:AppSettings =  {
  language: "en",
  theme: "lightTheme",
};


@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  public settings = new FormGroup({
    'language': new FormControl('', Validators.required),
    'theme': new FormControl('', Validators.required),
  });


  constructor() {
    let setti = JSON.parse(localStorage.getItem("settings"));
    console.log("Settings: ", setti)
    if (setti !== null) {
      for (const [key, val] of Object.entries(DEFAULT_SETTING)) {
        if (setti[key] === undefined) {
          setti[key] = val;
        }
      }
      this.settings.patchValue(setti);
      this.storeConfig();
    } else {
      this.settings.patchValue(DEFAULT_SETTING);
    }
    this.storeConfig();

    this.settings.valueChanges.subscribe((value) => {
      console.log("Settings did change", value);
      this.storeConfig();
    });
  }

  get current():AppSettings {
    return this.settings.value as AppSettings;
  }

  private storeConfig() {
    localStorage.setItem("settings", JSON.stringify(this.settings.value));
  }
}
