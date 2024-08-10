/**
 * ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2023
 * ---------------------------------------------------------------------------
 *  exerma_misc.js
 * ---------------------------------------------------------------------------
 *
 * Versions:
 *   2024-07-29: Add: makeStringUnique()
 *   2023-11-12: Fix: Hours were badly returned in
 *   2023-10-08: Add: stringifyArray() to add a safe stringification of arrays made of simple types
 *   2023-09-08: First version
 *
 */
import type * as ex from './exerma_types';
/**
 * Right align an integer number by adding zeros on the left
 * If the number needs more digits than "count" then it will not be truncated
 * @param {number} intValue the integer number to right align with zeros
 * @param {number} count the minimum number of digits that should be visible
 * @param {string} leftchar is the char to use on the left to align the number
 *                 (default='0', if empty, then use '0', if multichar, then
 *                 use only the first char of the provided string)
 * @param {object} options is used to provide additional options
 * @param {boolean} options.forceTruncate is used to force truncation of number
 *                 needing more than "count" digits to be displayed (if true)
 *                 (default=false: don't truncate)
 * @returns {string} is a right aligned with the provided leftchar
 */
export declare function numberToStringRightAlign(intValue: number, count: number, leftchar?: string, options?: {
    forceTruncate: boolean;
}): string;
/**
 * Convert a date and time object into a "YYYY-MM-DD--HHMMSS"
 * @param {Date} aDate is the date time to convert into string
 * @param {object} options is used to fine-tune the result
 * @param {boolean} options.noDate is used to not include the date
 *                 part in the result (return only "HHMMSS")
 *                 (default=false: include the date)
 * @param {boolean} options.noTime is use to not include the time
 *                 part in the result (return only "YYY-MM-DD")
 *                 (default=false: include the time)
 * @param {boolean} options.noSeconds is used to not include the
 *                 seconds in the time part (return only "HHMM")
 *                 (default=false: include seconds)
 * @param {boolean} options.addMilliseconds is used to add the milliseconds
 *                 to the time part (return "HHMMSSsss").
 *                 It is ignored if options.noSeconds=true
 *                 (default=false: don't add milliseconds)
 * @param {string} options.datetimeSep is the separator to use between the
 *                 date and the time parts.
 *                 (default="--":  "YYYY-MM-DD--HHMMSS")
 * @param {string} options.dateSep is the separator to use between the
 *                 parts of the date
 *                 (default="-":  "YYYY-MM-DD")
 * @param {string} options.timeSep is the separator to use between the
 *                 parts of the time
 *                 (default="":  "HHMMSS")
 * @returns {string} is the requires string
 */
export declare function datetimeToStringTag(aDate: Date, options?: {
    noDate?: boolean;
    noTime?: boolean;
    noSeconds?: boolean;
    addMilliseconds?: boolean;
    datetimeSep?: string;
    dateSep?: string;
    timeSep?: string;
}): string;
/**
 * Split a date into simple fields (like 'yyyy', 'HH') and save them in a map of
 * <fieldname;fieldvalue> (in string format) for a later fieldReplacement() for
 * example or for manual use of the formatted data.
 * The following fields are extracted:
 *     ${d}       = the day in format "0" (all date fields refer to the date/time of the mail)
 *     ${dd}      = the day in format "00"
 *     ${ddd}     = the day of the week in format "Mon"
 *     ${dddd}    = the day of the week in format "Monday"
 *     ${m}       = the month in format "0"
 *     ${mm}      = the month in format "00"
 *     ${mmm}     = the month in format "dec"
 *     ${mmmm}    = the month in format "December"
 *     ${mmmmm}   = the month in format "D" (first letter of month)
 *     ${yy}      = the year in format "00"
 *     ${yyyy}    = the year in format "0000"
 *     ${H}       = the hours in format "0" (24h)
 *     ${H12}     = the hours in format "0" (12h)
 *     ${HH}      = the hours in format "00" (24h)
 *     ${HH12}    = the hours in format "00" (12h)
 *     ${MM}      = the minutes in format "00"
 *     ${SS}      = the seconds in format "00"
 *     ${MSS}     = the milliseconds in format "000"
 *     ${yyyy-mm-dd} = alias to build the field format
 *     ${yyyymmdd}   = alias to build the field format
 *     ${HH-MM-SS}   = alias to build the field format
 *     ${HHMMSS}     = alias to build the field format
 *     ${HHMM}       = alias to build the field format
 *     ${HH-MM}      = alias to build the field format
 *     ${isodate}    = the date and time in "2011-10-05T14:48:00.000Z" iso format
 * @param {Date} aDate is the date to extract to fields into rules for fieldReplacement()
 * @param {object} options is a list of optional parameters
 * @param {string} options.datesep is the separator to use for the "yyyy-mm-dd" kind
 *                  of format (default = '-')
 * @param {string} options.timesep is the separator to use for the "HH-MM" kind of
 *                  format (default = ':')
 * @param {ex.MStringString} options.feedMap is a existing Map<string,string> to feed¨
 *                  instead of creating a new Map object
 * @returns {ex.MStringString} is the map of <field;value>
 */
export declare function datetimeToFieldReplacement(aDate: Date, options?: {
    datesep?: string;
    timesep?: string;
    feedMap?: ex.MStringString;
}): ex.MStringString;
/**
 * It is suprisingly complicated to retrieve a property by name from an object with
 * an undefined type. This function allows to parse all values of the object to find
 * the required key.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * https://stackoverflow.com/questions/41993515/access-object-key-using-variable-in-typescript
 * @param {object | undefined} obj is the undefined object we want to retrieve the "key" value of
 * @param {string} key is the key to find in the obj object
 * @returns {any} is the found value associated to the key or undefined if not found
 */
export declare function retrieveValueFromUnstructuredObject(obj: object | undefined, key: string): any | undefined;
/**
 * Replace the "${key}" fields of the template by the value associated to the
 * key in the fieldReplacement map.
 * Note: The "${" and "}" separator can be modified with "options" if necessary.
 * Note: Fields are replaced in the iterator order of the map (forEach() order)
 *       onces but in all occurrences found in the template in current state.
 * @param {string} template is the string to replace the fields into
 * @param {ex.MStringString} fieldReplacement is a Map<fieldName,fieldValue> containing
 *                   the values to replace the fields by in the template.
 *                   Every field is found with format "${field}" --> "value"
 * @param {object} options is a way to replace the opening and cloiing tags around
 *                  the field names used to retrieve the fields in template
 * @param {string} options.openTag is the prefix added to each field used to
 *                  search for the field (default='${')
 * @param {string} options.closeTag is the suffix added to each field used to
 *                  search for the field (default='}')
 * @returns {string} is the template after replacement of fields
 */
export declare function fieldReplacement(template: string, fieldReplacement: ex.MStringString, options?: {
    openTag?: string;
    closeTag?: string;
}): string;
/**
 * Compare the properties of the source with the provided template to assert it is
 * built correctly (or belongs to the good type / class)
 * @param {object} source is the object to check for the properties of
 * @param {object} template is the template object the source must match the properties of
 * @param {object} options is for optional parameters
 * @param {boolean} options.strict is used to assert that the source has no additional properties
 *                  compared to the template (if true) or only assert that the
 *                  source has *at least* the template properties (if false, default)
 * @returns {boolean} is true if the source matches the requirements, false if not
 *                  or if an error occurs
 */
export declare function objectHasSameProperties(source: object, template: object, options?: {
    strict: boolean;
}): boolean;
/**
 * Add prefix (and optionnaly suffix) to every line of the provided text string.
 * It can ignore empty lines or remove them if required
 * @param {string} source is the string to add prefix / suffix to every line
 * @param {string} prefix is the string to add as prefix to every line
 * @param {object} options are the optional parameters
 * @param {string} options.suffix is an optional suffix to add to the altered lines
 * @param {string} options.replaceEmpty is used to replace empty lines with the provided
 *                  string (this is done before testing ignoreEmpty and removeEmpty)
 * @param {boolean} options.ignoreEmpty is used to ignore the empty lines (if set
 *                  to true) or to add the prefix / suffix to empty lines too.
 *                  Default is false to alter empty lines.
 * @param {boolean} options.removeEmpty is used to remove the empty lines (if true,
 *                  then ignore changeEmpty=true), or to keep them unchanged
 *                  empty lines (if false, default)
 * @param {string} options.separator is the separator to used between line (default
 *                  is the cNewLine constant)
 * @param {string} options.ifError is the value to return if an error occurs during
 *                  the function (default = '')
 * @returns {string} is the modified string
 */
export declare function stringPrefixLinesWith(source: string, prefix: string, options?: {
    suffix?: string;
    replaceEmpty?: string;
    ignoreEmpty?: boolean;
    removeEmpty?: boolean;
    separator?: string;
    ifError?: string;
}): string;
/**
 * Convert an integer number of bytes into a "10.4 Ko", "100.0 Mb" string
 * source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param {number} bytes is the size in byte to convert into a human reading size
 * @param {number} decimals is the number of decimals to display (default=2)
 * @param {object} params is used to set additional parameters
 * @param {boolean} params.noUnits is used to not include the label in the output
 *                  (if true) or to left align it (if false, default)
 * @param {number} params.rightAlignSize is used to right align the result and
 *                  return a string with the required total length
 * @returns {string} is the converted
 */
export declare function numberToByteSize(bytes: number, decimals?: number, params?: {
    noUnits?: boolean;
    rightAlignSize?: number;
}): string;
/**
 * # Make a string unique in a dictionary
 *
 * Check if a string exists in a dictionary and, if yes, then create a new string by adding
 * a number as suffix with an increasing counter until the result is unique in the dictionary.
 *
 * In addition, the newly created string is automatically added to the dictionary to allow
 * the system to be fed by the new values.
 *
 * Versions: 29.07.2024
 * @param {string} root is the root text to make unique (by adding "-000" style extension)
 *                       if already in the "notInMap" dictionary
 * @param {Map<string,string>} alterNotInMap is the map to search for the root text. If it
 *                       contains the root text, then the function will create a new one
 *                       by adding the separator and a number. The final, unique, name is
 *                       automatically added to alterNotInMap (excepted if dontAutoAdd=true)
 * @param {object} object is the list of optional paramters
 * @param {string} object.separator is the separator to add to the name if it already exist
 *                       in list (default = '-')
 * @param {number} object.counterLen is the minimum number of digits to add after the separator
 *                       when building the unique name (default = 3).
 * @param {boolean} object.upCased is used to search the Map in an insensitive way by comparing all
 *                       strings in upcase (default = false).
 * @param {boolean} object.dontAutoAdd is used to not add automtically the new unique name (naked
 *                       root or extended in "root-000" format)(if true) to alterNotInMap or to
 *                       add it automatically (if false, default)
 * @param {number} object.maxCount is the maximum number to loop until a unique string is found (if
 *                       this number is reached, the function will return an empty string)
 * @returns {string} is the unique name (either the native root or the one make)
 */
export declare function stringMakeUnique(root: string, alterNotInMap: ex.MStringString, { separator, counterLen, upCased, dontAutoAdd, maxCount }: {
    separator?: string;
    counterLen?: number;
    upCased?: boolean;
    dontAutoAdd?: boolean;
    maxCount?: number;
}): string;
//# sourceMappingURL=exerma_misc.d.ts.map