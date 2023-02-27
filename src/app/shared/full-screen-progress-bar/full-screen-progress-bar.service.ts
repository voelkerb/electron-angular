import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { FullScreenProgressBarComponent, progressBarMsg } from './full-screen-progress-bar.component';



/**
 * Display a progress bar and any message translatable message as a fullScreen overlay
 * 
 * ```typescript 
 * constructor(private progressBar: FullScreenProgressBarService,...) {
 * ...
 * // Start showing the progressbar in fullscreen with the given message
 * // en.json => "TEXT.MSG": "Downloading: {file}"
 * this.progressBar.show(0, {"msg":"TEXT.MSG",param:{file:"example.pdf"}});
 * ... 
 * // Update percentage
 * this.progressBar.update((totalBytes/bytesReceived)*100.0);
 * ... 
 * // Hide the progress bar
 * this.progressBar.hide();
 * ``` 
 */
@Injectable({
    providedIn: 'root'
})
export class FullScreenProgressBarService {

    /** Reference to the fullscreen overlay */
    private overlayRef: OverlayRef = null;
    /** Component display in the fullscreen overlay */
    private componentRef: ComponentRef<FullScreenProgressBarComponent> = null;

    /** Keep track of the overlay currently shown or not */
    public shown: boolean = false;

    constructor(private overlay: Overlay) { }

    /**
     * Show the progress bar
     * @param percent current percentage
     * @param message translatable message
     */
    public show(percent = 0, message: progressBarMsg = { text: '', param: {} }) {
        // Create overlay of not already done
        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create();
        }

        // Create ComponentPortal that can be attached to a PortalHost
        const progressBarPortal = new ComponentPortal(FullScreenProgressBarComponent);
        this.componentRef = this.overlayRef.attach(progressBarPortal); // Attach ComponentPortal to PortalHost
        this.componentRef.instance.message = message;
        this.componentRef.instance.percent = percent;
        this.shown = true;
    }

    /**
     * Update the progress bar
     * @param percent current percentage
     * @param message translatable message
     */
    public update(percent = 0, message: progressBarMsg | null = null) {
        if (!this.shown || this.componentRef == null) return;
        if (message !== null) this.componentRef.instance.message = message;
        this.componentRef.instance.percent = percent;
    }

    /**
     * Hide the progress bar
     * @param percent current percentage
     * @param message translatable message
     */
    public hide() {
        if (!this.shown || this.componentRef == null) return;
        this.componentRef.instance.percent = 0.0;

        if (!!this.overlayRef) {
            this.overlayRef.detach();
        }
        this.componentRef = null;
        this.shown = false;
    }
}