import { Pipe, PipeTransform } from '@angular/core';

/** File size Byte possibilities */
export type FileSizeType = "TB" | "GB" | "MB" | "kB" | "B";

/**
 * Pipe to convert bytes to a more friendly readable version (such as MB)
 * @example
 * <span>"{{ value | fileSize }}"</span>
 * <span>"{{ value | fileSize:"MB" }}"</span>
 */
@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

    /**
     * Pipe transform to file size
     * @param size value to convert 
     * @param type wished size (automatically determined if null is passed)
     * @returns ready formatted string 
     */
    transform(size: number, type: FileSizeType | null = null) {
        // Automatically determine size delimiter if nothing passed
        if (type === null) {
            let types: FileSizeType[] = ["B", "kB", "MB", "GB", "TB"];
            let tSize = size / 1024;
            let idx = 0;
            while (tSize > 1) {
                idx++;
                tSize /= 1024;
            }
            type = "TB";
            if (idx < types.length) type = types[idx];
        }

        let divider = 1; // standard divider for Bytes
        switch (type) {
            case "TB": divider *= 1024;
            case "GB": divider *= 1024;
            case "MB": divider *= 1024;
            case "kB": divider *= 1024;
            case "B":
                break;
            default:
                break;
        }
        // Return corrected size with 2 decimals
        return (size / divider).toFixed(2) + type;
    }
}
