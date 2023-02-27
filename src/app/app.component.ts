import { ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from '@angular/material/icon';
import { unsubscribeAll } from './shared/functions/unsubscribe';
import { AppSettingsService } from './services/app-settings.service';


/**
 * @brief Standard application entry. Keeps track of language, icons and electron process
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /** Contains theme name class if user switches theme */
    @HostBinding('class') className = '';
    /** Currently active theme */
    theme : string = "";

    /** Active subscriptions of the component */
    private subscriptions = []

    /** Constructor */
    constructor(private overlay: OverlayContainer,
                private cdRef: ChangeDetectorRef,
                private electronService: ElectronService,
                private translate: TranslateService,
                private settings: AppSettingsService) {
        // English is default language 
        this.translate.setDefaultLang('en');
        // Set currently active language
        this.translate.use(this.settings.settings.get('language').value);
        // Listen to changes and use changed language
        this.subscriptions.push(
            this.settings.settings.get('language').valueChanges.subscribe((language) => {
                this.translate.use(language);
            })
        );

        // To init the electron service on app start 
        if (electronService.isElectron) {
            console.log('Run in electron');
        } else {
            console.log('Run in browser');
        }
    }

    /**
     * On init of the dome elements, change the theme according to the one
     * stored in settings.
     */
    ngOnInit() {
        // Current theme
        this.changeTheme(this.settings.settings.get('theme').value);
        // Subscription for changes
        this.subscriptions.push(
            this.settings.settings.get('theme').valueChanges.subscribe((theme) => {
                this.changeTheme(theme);
            })
        );
        // Force the change detector to fire
        this.cdRef.detectChanges();
    }

    /**
     * On destroy, unsubscribe all active subscriptions.
     */
    ngOnDestroy() {
        unsubscribeAll(this.subscriptions);
    }
    /**
     * Adds new theme name to classList and removes old themes name.
     * @param theme 
     */
    changeTheme(theme) {
        this.className = theme;
        // Add classname to overlay container as well
        if (this.theme !== theme) {
            if (this.overlay.getContainerElement().classList.contains(this.theme)) {
                this.overlay.getContainerElement().classList.remove(this.theme);
            }
            this.overlay.getContainerElement().classList.add(theme);
            this.theme = theme;
        }
    }

}
