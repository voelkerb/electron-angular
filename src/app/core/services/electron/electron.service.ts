import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { Platform } from '@angular/cdk/platform';

@Injectable({
    providedIn: 'root'
})
export class ElectronService {
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    childProcess: typeof childProcess;
    fs: typeof fs;

    detectedPlatform = this.getPlatform().toLowerCase();

    isMacOS = /mac/.test(this.detectedPlatform); // Mac desktop
    isIOS = ['iphone', 'ipad', 'ipod'].indexOf(this.detectedPlatform) !== -1; // Mac iOs
    isApple = this.isMacOS || this.isIOS; // Apple device (desktop or iOS)
    isWindows = /win/.test(this.detectedPlatform); // Windows
    isAndroid = /android/.test(this.detectedPlatform); // Android
    isLinux = /linux/.test(this.detectedPlatform); // Linux

    constructor() {
        // Conditional imports
        if (this.isElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;

            this.fs = window.require('fs');

            this.childProcess = window.require('child_process');
            this.childProcess.exec('node -v', (error, stdout, stderr) => {
                if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout:\n${stdout}`);
            });

            console.log("Reinit electronservice");
            // Notes :
            // * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
            // and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
            // because it will loaded at runtime by Electron.
            // * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
            // in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
            // in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

            // If you want to use a NodeJS 3rd party deps in Renderer process,
            // ipcRenderer.invoke can serve many common use cases.
            // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
        }
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }


    getPlatform() {
        // 2022 way of detecting. Note : this userAgentData feature is available only in secure contexts (HTTPS)
        if (typeof (navigator as any)["userAgentData"] !== 'undefined' && (navigator as any)["userAgentData"] != null) {
            return (navigator as any)["userAgentData"].platform;
        }
        // Deprecated but still works for most of the browser
        if (typeof navigator.platform !== 'undefined') {
            if (typeof navigator.userAgent !== 'undefined' && /android/.test(navigator.userAgent.toLowerCase())) {
                // android device’s navigator.platform is often set as 'linux', so let’s use userAgent for them
                return 'android';
            }
            return navigator.platform;
        }
        return 'unknown';
    }


}
