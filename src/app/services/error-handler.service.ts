import { Injectable } from '@angular/core';
import { NotificationHandlerService } from './notification-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private notify: NotificationHandlerService) { }
  
  logError(message, notify:boolean=true) {
    console.log("Error:", message);
    if (notify) this.notify.showErrorNotification(message, {text:"ok"});
  }
  logWarning(message, notify:boolean=true) {
    console.warn("Warn:", message);
    if (notify) this.notify.showWarningNotification(message, {text:"ok"});
  }
}
