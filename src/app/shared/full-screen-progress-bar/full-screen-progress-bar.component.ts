import { Component, Input, OnInit } from '@angular/core';

/** Interface for message showing */
export interface progressBarMsg {
    text: string,
    param: any,
}

/**
 * Component displaying the fullscreen progress bar.
 * @example
 * <fullscreen-progress-bar [hidden]="!shown" [message]="msg" [percent]="percent"></fullscreen-progress-bar>
 */
@Component({
    selector: 'fullscreen-progress-bar',
    templateUrl: './full-screen-progress-bar.component.html',
    styleUrls: ['./full-screen-progress-bar.component.scss']
})
export class FullScreenProgressBarComponent {
    // Translatable message displayed
    @Input() public message: progressBarMsg;
    // Percent from 0-100
    @Input() public percent: number = 10.0;
    // hidden
    @Input() public hidden: false;
}