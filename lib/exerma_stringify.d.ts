/**
 * ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2023
 * ---------------------------------------------------------------------------
 *  exerma_stringify.js
 * ---------------------------------------------------------------------------
 *
 * Reference:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
 *
 * Versions:
 *   2023-12-03: Rem: Add hyperling reference to the "Structured_clone_algorithm"
 *   2023-10-08: First version
 *
 */
import type * as ex from './exerma_types';
interface SafeItem {
    type: string;
    control: string;
}
type uSafeItem = SafeItem | undefined;
/**
 * Safely transform the provided item into a string using JSON.stringify() but including
 * including safety conversion information before:
 * 1) An object is created with the following structure:
 *    { type: type: 'boolean'| 'string' | 'number' | 'Date' | 'object' | 'array' | 'undefined',
 *      control: --> controlDescr,
 *      data: JSON.stringify(source) or recurse on array
 *    }
 *    Note 1: the data types are using the cTypeNameXxxxx string constants to describe types
 *    Note 2: objects in data are
 * 2) This resulting object is stringified with JSON.stringify()
 * @param {any} source is a the data item to stringify with a data control and
 *                  some data restoration safeguards.
 * @param {string} controlDescr is a control code to add to every sub-
 * @param {string} ifError is the value to return if an error occurs
 * @returns {string} is the stringified version of the provided item
 */
export declare function safeStringify(source: any, controlDescr?: string, ifError?: string): string;
/**
 * Unstringifies the provided "source" string into a Any item
 * @param {string} source is the safeStringify() string to convert back into its value
 * @param {string} controlDescr is the safeguard to apply on the control member of the
 *                  object (its "control" member must match). Ignored if empty (default)
 * @param {object} options are the optional options of the function
 * @param {string} options.ifError is the value to return if an error occurs (default = undefined)
 * @param {boolean} options.noError is used to not raise an error if the conversion fails
 *                  (if true) or to raise an error (if false, default).
 *                  Note: This flag doesn't remove unexpected errors: only conversion errors
 * @returns {any} is the extracted value or ifError if an error occurs
 */
export declare function safeUnstringifyAsAny(source: string, controlDescr?: string, options?: {
    ifError?: uSafeItem;
    noError?: boolean;
}): any;
/**
 * Unstringifies the provided "source" string into a boolean
 * @param {string} source is the safeStringify() string to convert back into a boolean
 * @param {string} controlDescr is the safeguard to apply on the control member of the
 *                  object (its "control" member must match). Ignored if empty (default)
 * @param {object} options are the optional options of the function
 * @param {boolean} options.ifError is the value to return if an error occurs
 *                  (default = undefined)
 * @param {boolean} options.noError is used to not raise an error if the conversion fails
 *                  (if true) or to raise an error (if false, default).
 *                  Note: This flag doesn't remove unexpected errors: only conversion errors
 * @returns {ex.uBoolean} is the extracted value or ifError if an error occurs
 */
export declare function safeUnstringifyAsBoolean(source: string, controlDescr?: string, options?: {
    ifError?: boolean;
    noError?: boolean;
}): ex.uBoolean;
/**
 * Unstringifies the provided "source" string into a string
 * @param {string} source is the safeStringify() string to convert back into a string
 * @param {string} controlDescr is the safeguard to apply on the control member of the
 *                  object (its "control" member must match). Ignored if empty (default)
 * @param {object} options are the optional options of the function
 * @param {string} options.ifError is the value to return if an error occurs (default = undefined)
 * @param {boolean} options.noError is used to not raise an error if the conversion fails
 *                  (if true) or to raise an error (if false, default).
 *                  Note: This flag doesn't remove unexpected errors: only conversion errors
 * @returns {ex.uString} is the extracted value or ifError if an error occurs
 */
export declare function safeUnstringifyAsString(source: string, controlDescr?: string, options?: {
    ifError: ex.uString;
    noError?: boolean;
}): ex.uString;
/**
 * Unstringifies the provided "source" string into a number
 * Note: NaN numbers are considered as error
 * @param {string} source is the safeStringify() string to convert back into a number
 * @param {string} controlDescr is the safeguard to apply on the control member of the
 *                  object (its "control" member must match). Ignored if empty (default)
 * @param {object} options are the optional options of the function
 * @param {string} options.ifError is the value to return if an error occurs (default = undefined)
 * @param {boolean} options.noError is used to not raise an error if the conversion fails
 *                  (if true) or to raise an error (if false, default).
 *                  Note: This flag doesn't remove unexpected errors: only conversion errors
 * @returns {ex.uNumber} is the extracted value or ifError if an error occurs
 */
export declare function safeUnstringifyAsNumber(source: string, controlDescr?: string, options?: {
    ifError: ex.uNumber;
    noError?: boolean;
}): ex.uNumber;
/**
 * Unstringifies the provided "source" string into a Date
 * @param {string} source is the safeStringify() string to convert back into a Date
 * @param {string} controlDescr is the safeguard to apply on the control member of the
 *                  object (its "control" member must match). Ignored if empty (default)
 * @param {object} options are the optional options of the function
 * @param {string} options.ifError is the value to return if an error occurs (default = undefined)
 * @param {boolean} options.noError is used to not raise an error if the conversion fails
 *                  (if true) or to raise an error (if false, default).
 *                  Note: This flag doesn't remove unexpected errors: only conversion errors
 * @returns {ex.uDate} is the extracted value or ifError if an error occurs
 */
export declare function safeUnstringifyAsDate(source: string, controlDescr?: string, options?: {
    ifError: ex.uDate;
    noError?: boolean;
}): ex.uDate;
/**
 * Unstringifies the provided "source" string into an array of the provided type
 * @param {string} source is the safeStringify() string to convert back into a Date
 * @param {string} controlDescr is the safeguard to apply on the control member of the
 *                  object (its "control" member must match). Ignored if empty (default)
 * @param {object} options are the optional options of the function
 * @param {string} options.ifError is the value to return if an error occurs (default = undefined)
 * @param {boolean} options.noError is used to not raise an error if the conversion fails
 *                  (if true) or to raise an error (if false, default).
 *                  Note: This flag doesn't remove unexpected errors: only conversion errors
 * @returns {Array} is the extracted value or ifError if an error occurs
 */
export declare function safeUnstringifyAsArray<T>(source: string, controlDescr?: string, options?: {
    ifError: T[] | undefined;
    noError?: boolean;
}): T[] | undefined;
export {};
//# sourceMappingURL=exerma_stringify.d.ts.map