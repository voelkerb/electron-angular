import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * Indicate missing translations via \"missing: <KEY>\"
 */
export class MissingTranslationHandlerModule implements MissingTranslationHandler {     

    /**
     * Handle the translation
     * @param params translation parameter
     * @returns 
     */
    handle(params: MissingTranslationHandlerParams) {
        let val = 'missing: ' + params.key;
        if (params.interpolateParams) val += " " + params.interpolateParams.toString();
        return val;
    }
}
