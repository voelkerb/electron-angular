import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

/**
 * Notification type interface (either error, warning or info)
 */
enum NotificationType {
    error = "error",
    warning = "warning",
    info = "info"
}

export interface NotificationAction {
    text: string,
    func?: Function,
}

/**
 * NotificationHandler service. Display notification as [MatSnackBar](https://material.angular.io/components/snack-bar/overview) entries.
 * 
 * ```typescript
 * ...
 * constructor(private notify: NotificationHandlerService, private translate: TranslationService, ...) {}
 * ...
 * // Display error notification
 * this.notify.showErrorNotification("Error creating user " + this.username);
 * // Show warning notification with okay button for 2s
 * this.notify.showWarningNotification("Example warning", "Ok", 2000);
 * // Show info notification with okay button for 3s on the bottom centered
 * this.notify.showInfoNotification("Successfully loaded " + file.name, "Ok", 3000, "center", "bottom");
 * // NOTE: currently all messages must be internationalized before passing to the functions
 * // So do sth. like:
 * let msg = this.translate.instant("TEXT.ERROR_CONNECT");
 * let okay = this.translate.instant("ACTIONS.OKAY");
 * this.notify.showInfoNotification(msg, okay, 3000, "center", "bottom");
 * ```
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationHandlerService {

    /**
     * Interface to convert to snackbar class
     */
    private panelClasses = {
        error: "error-snackbar",
        warning: "warning-snackbar",
        info: "info-snackbar",
    }


    constructor(private snackBar: MatSnackBar) { }

    /**
     * Show an error notification
     * @param message Message to display in notification
     * @param action Action we allow the user or null
     * @param duration optional duration to display notification
     * @param hpos horizontal position of notification
     * @param vpos vertical position of notification
     */
    showErrorNotification(
        message: string,
        action: NotificationAction | null = null,
        duration: number = 2000,
        hpos: MatSnackBarHorizontalPosition = "center",
        vpos: MatSnackBarVerticalPosition = "top") {
        this.showNotification(message, action, NotificationType.error, duration, hpos, vpos);
    }

    /**
     * Show a warning notification
     * @param message Message to display in notification
     * @param action Action we allow the user or null
     * @param duration optional duration to display notification
     * @param hpos horizontal position of notification
     * @param vpos vertical position of notification
     */
    showWarningNotification(
        message: string,
        action: NotificationAction | null = null,
        duration: number = 2000,
        hpos: MatSnackBarHorizontalPosition = "center",
        vpos: MatSnackBarVerticalPosition = "top") {
        this.showNotification(message, action, NotificationType.warning, duration, hpos, vpos);
    }

    /**
     * Show an info notification
     * @param message Message to display in notification
     * @param action Action we allow the user or null
     * @param duration optional duration to display notification
     * @param hpos horizontal position of notification
     * @param vpos vertical position of notification
     */
    showInfoNotification(
        message: string,
        action: NotificationAction | null = null,
        duration: number = 2000,
        hpos: MatSnackBarHorizontalPosition = "center",
        vpos: MatSnackBarVerticalPosition = "top") {
        this.showNotification(message, action, NotificationType.info, duration, hpos, vpos);
    }

    /**
     * Show notification of given type
     * @param message Message to display in notification
     * @param action Action we allow the user or null
     * @param type optional type of the notification
     * @param duration optional duration to display notification
     * @param hpos horizontal position of notification
     * @param vpos vertical position of notification
     */
    private showNotification(
        message: string,
        action: NotificationAction | null = null,
        type: NotificationType = NotificationType.error,
        duration: number = 1000,
        hpos: MatSnackBarHorizontalPosition = "center",
        vpos: MatSnackBarVerticalPosition = "top") {
        let snackBarRef = this.snackBar.open(message, action.text, {
            horizontalPosition: hpos,
            verticalPosition: vpos,
            duration: duration,
            panelClass: [this.panelClasses[type]]
        });

        snackBarRef.onAction().subscribe(() => {
            if (action.func) action.func();
        });
    }
}
