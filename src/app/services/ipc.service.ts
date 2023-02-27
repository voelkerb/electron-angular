import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
    providedIn: 'root'
})
export class IpcService {
    private _ipc: IpcRenderer | undefined;

    constructor() {
        if (window.require) {
            try {
                this._ipc = window.require('electron').ipcRenderer;
                console.log('Electron\'s IPC loaded');
            } catch (e) {
                throw e;
            }
        } else {
            console.warn('Electron\'s IPC was not loaded');
        }
    }



    public on(channel: string, listener: Function): void {
        if (!this._ipc) return;
        this._ipc.on(channel, (evt, args) => listener(evt, args));
    }

    public once(channel: string, listener: Function): void {
        if (!this._ipc) return;
        this._ipc.once(channel, (evt, args) => listener(evt, args));
    }

    public send(channel: string, ...args): void {
        if (!this._ipc) return;
        this._ipc.send(channel, ...args);
    }


}
