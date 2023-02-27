import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { IpcService } from 'app/services/ipc.service';
import { NotificationHandlerService } from 'app/services/notification-handler.service';
import { ElectronService } from '../../core/services';
import { AppSettingsService } from '../../services/app-settings.service';


@Component({
    selector: 'app-navigation-bar',
    templateUrl: './app-navigation-bar.component.html',
    styleUrls: ['./app-navigation-bar.component.scss']
})
export class AppNavigationBarComponent implements OnInit {

    @Input('numEvents') numEvents: number = 0;

    navLinks = [
        { path: 'page1', label: 'PAGE1.TITLE', icon: 'thumb_up' },
        { path: 'settings', label: 'SETTINGS.TITLE', icon: 'settings' },
    ];

    themes = [
        { id: 'lightTheme', name: "THEMES.LIGHT"},
        { id: 'darkTheme', name: "THEMES.DARK"},
        { id: 'customTheme', name: "THEMES.CUSTOM"},
    ]

    @ViewChild('themeButton',{read:ElementRef}) themeButtonComponent:ElementRef
    curTheme = new FormControl('')

    overlayEl:Element

    constructor(private settings: AppSettingsService,
        public electronHelper: ElectronService,
        private notify: NotificationHandlerService,
        private translate: TranslateService,
        private ipc: IpcService) { }

    ngOnInit(): void {
        // Set theme from settings
        this.curTheme.setValue(this.settings.settings.get('theme').value);
        // Get when user maximizes window
        this.ipc.on('maximized', () => {
            document.body.classList.add('maximized');
            console.log("maximized");
        });
        // Get when user unmaximizes window
        this.ipc.on('unmaximized', () => {
            document.body.classList.remove('maximized');
            console.log("unmaximized");
        });
        // If not windows, hide controls
        if (!this.electronHelper.isWindows) this.hideWindowsControls();
        // If maxOS, increase navbar height s.t. window buttons are not inside view
        if (this.electronHelper.isMacOS) this.addExtraDragBar();
    }

    ngAfterViewInit(): void {
        // Get overlay of theme button
        const el = (this.themeButtonComponent.nativeElement as Element).querySelector('.mat-button-focus-overlay');
        if(el) this.overlayEl=el;
    }

    changeTheme(event) {
        this.settings.settings.get('theme').setValue(event)
    }

    removeOverlay(){
        this.overlayEl.classList.remove('mat-button-focus-overlay')
    }
    
    addOverlay(){
        this.overlayEl.classList.add('mat-button-focus-overlay')
    }

    dummyError() {
        this.notify.showErrorNotification(this.translate.instant('ERRORS.CANNOT_CONNECT'), {text:this.translate.instant('ACTIONS.OK')}, 3000)
    }
    dummyWarning() {
        this.notify.showWarningNotification(this.translate.instant('WARNING.MSG_TOO_LONG'), {text:this.translate.instant('ACTIONS.OK')}, 3000)
    }
    dummyInfo() {
        this.notify.showInfoNotification(this.translate.instant('INFO.APPLE'), {text:this.translate.instant('ACTIONS.CONFIRM')}, 3000)
    }
    
    windowsMinBtnClicked() {
        this.ipc.send('actionMin');
    }

    windowsMaxBtnClicked() {
        this.ipc.send('actionMax');
    }

    windowsRestoreBtnClicked() {
        this.ipc.send('actionRestore');
    }

    windowsCloseBtnClicked() {
        this.ipc.send('actionClose');
    }

    
    hideWindowsControls() {
        var div = document.getElementById('windows-controls');
        div.style.display = 'none';
    }


    addExtraDragBar() {
        // Need to mess with global style sheet variables
        var r = document.querySelector(':root') as any;
        var rs = getComputedStyle(r);
        let newVal = rs.getPropertyValue('--add-toolbar-height-mac')
        // Set the value of variable --blue to another value (in this case "lightblue")
        r.style.setProperty('--add-toolbar-height', newVal);
        rs = getComputedStyle(r);
        // Alert the value of the --blue variable
        console.log("add-toolbar-height " + rs.getPropertyValue('--add-toolbar-height'));
    }
}
