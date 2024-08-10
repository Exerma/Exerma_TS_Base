/* ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2023  
 * ---------------------------------------------------------------------------
 *  exerma_i18n.js
 * ---------------------------------------------------------------------------
 *
 * Versions:
 *   2023-12-03: First version
 * 
 */

    // --------------- Imports
    // import { datetimeToStringTag } from './exerma_misc'  --> Use a locally optimised version of it


    // --------------- Types
    type LanguageCode = string


    // --------------- Constants


    // --------------- Class

    export class CLanguage {

        // ---------- Private members
        /**
         * Language managed by this object
         */
        private readonly _language: LanguageCode

        // ---------- Big four
        /**
         * Initialize the object managing a specific language
         * @param {string} language is the language managed by this instence
         */
        constructor (language: LanguageCode) {

            this._language = language

        }

        // ---------- Public functions
        /**
         * Get the localized version of the provided message (with the optional field substitutions)
         * @param {string} message is the name of the message to retrieve the localized value of
         * @param {object} options allows the user to provide optional parameters
         * @param {string | string[]} options.substitution is used to replace fields in the string with the
         *              provided value(s)
         * @param {string} options.ifNotFound is the value to return if the native getMessage() returns '' or
         *              is undefined
         * @param {boolean} feminine is used to inform the system that the subject is feminine (and not neutral)
         * @param {boolean} masculin is used to inform the system that the subject is masculin (and not neutral)
         * @param {number} count is the number of object(s) if there is a difference between one, two or many objects
         * @returns {string} is the localized string corresponding to the provided message name
         */
        public async getMessage (message: string,
                                 options: {
                                    substitution?: string | string[]
                                    ifNotFound?: string
                                    feminine?: boolean
                                    masculin?: boolean
                                    count?: number
                                }): Promise<string> {

            return message

        }

    }


    // ---------- Declare main internationalisation object
    let mainCLanguage: Map<string, CLanguage>

    /**
     * Get the main centralized CLanguage
     * @param {string} language is the name of the log to retrieve
     * @returns {CLanguage} is the main CLanguage object (built on demand)
     */
    type lang = (language: string) => CLanguage

    /**
     * Dummy function to retrieve messages to translate in future
     * @param {string} message is the localized message to translate later
     * @returns {string} is the untranslated message as this is only for later
     *                  translations
     */
    export function exLangFuture (message: string): string {

        return message

    }

    export default lang
