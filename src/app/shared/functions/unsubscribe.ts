import { Subscription } from "rxjs";

/**
 * Unsubscribe from all given subscriptiobs
 * 
 * ```typescript
 * import { unsubscribeAll } from '<path-to>/unsubscribe';
 * ... 
 * subscriptions = []
 * ...
 * ngOnInit() {
 *   this.subscriptions.push(test.subscribe((data) => { this.handleData(data) }));
 * }
 * ...
 * ngOnDestroy() {
 *   unsubscribeAll(this.subscriptions)
 * }
 * ```
 * @param subscription subscription or array of subscriptions
 */
export function unsubscribeAll(subscription: Subscription | Subscription[]) {
    const subscriptions = Array.isArray(subscription) ? subscription : [subscription];
    subscriptions.forEach(s => {
        if (s && !s.closed) s.unsubscribe();
    });
}