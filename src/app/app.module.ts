import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

import { ErrorHandlerService } from './services/error-handler.service';
import { NotificationHandlerService } from './services/notification-handler.service';
import { IpcService } from './services/ipc.service';
import { FullScreenProgressBarService } from './shared/full-screen-progress-bar/full-screen-progress-bar.service';
import { FullScreenProgressBarComponent } from './shared/full-screen-progress-bar/full-screen-progress-bar.component';
import { MissingTranslationHandlerModule } from './core/translation/missing-translation-handler/missing-translation-handler.module';



@NgModule({
  declarations: [
    AppComponent,
    FullScreenProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MissingTranslationHandlerModule
        },
      useDefaultLang: false
    }),
    MainModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ErrorHandlerService,
    NotificationHandlerService,
    FullScreenProgressBarService,
    IpcService,
    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}