import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { AppNavigationBarComponent } from './app-navigation-bar/app-navigation-bar.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { MainComponent } from './main.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { Page1Component } from './page1/page1.component';



const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'page1', component: Page1Component
            },
            {
                path: 'settings', component: AppSettingsComponent
            }
        ]
    },
];

@NgModule({
    declarations: [
        MainComponent,
        AppNavigationBarComponent,
        AppSettingsComponent,
        Page1Component,
    ],
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
    ],
    exports: [
    ],
    bootstrap: []
})
export class MainModule { }
