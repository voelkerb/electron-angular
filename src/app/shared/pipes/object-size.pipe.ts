import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to get the number of keys of a javascript object
 * @example
 * <span>"{{ value | fileSize }}"</span>
 * <span>"{{ value | fileSize:"MB" }}"</span>
 */
@Pipe({
    name: 'numkeys'
})
export class ObjectSizePipe implements PipeTransform {

    /**
     * Pipe transform to number of keys
     * @param obj javascript object
     * @returns number of keys
     */
    transform(obj: object) {
        return Object.keys(obj).length;
    }
}
