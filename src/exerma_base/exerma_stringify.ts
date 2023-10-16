/**
 * ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2023
 * ---------------------------------------------------------------------------
 *  exerma_stringify.js
 * ---------------------------------------------------------------------------
 *
 * Versions:
 *   2023-10-08: First version
 *
 */

    // --------------- Import
    import type * as ex from './exerma_types'
    import log, { cInfoStarted, cRaiseInvalidParameter, cRaiseUnexpected } from './exerma_log'
    import {
            cTypeNameUnknown,
            cTypeNameUndefined,
            cTypeNameBoolean,
            cTypeNameNumber,
            cTypeNameString,
            cTypeNameDate,
            cTypeNameObject,
            cTypeNameArray,
            cTypeNameMap,
            cNullString
            } from './exerma_consts'
    import { objectHasSameProperties } from './exerma_misc'

    // --------------- Types
    interface SafeItem {
                            type: string
                            control: string
                        }
    interface SafeItemValue extends SafeItem {
                            type: string
                            control: string
                            value: string
                        }
    interface SafeItemPair { key: string, value: string }
    interface SafeItemList extends SafeItem {
                            type: string
                            control: string
                            count: number
                            data: SafeItemPair[]
                        }
    type uSafeItem = SafeItem | undefined
    type uSafeItemValue = SafeItemValue | undefined
    type uSafeItemList = SafeItemList | undefined
    const safeItemTemplate: SafeItem = { type: cNullString, control: cNullString }
    const safeItemValueTemplate: SafeItemValue = { type: cNullString, control: cNullString, value: cNullString }
    const safeItemListTemplate: SafeItemList = { type: cNullString, control: cNullString, count: 0, data: [] }
    const safeItemPairTemplate: SafeItemPair = { key: cNullString, value: cNullString }


    // --------------- Stringify

    /**
     * Safely transform the provided array into a string using JSON.stringify() but including
     * including safety conversion information before:
     * 1) An object is created with the following structure:
     *    { type: 'array', 
     *      control: --> controlDescr,
     *      count: --> source.length,
     *      data: [ { type: 'Date' | 'boolean'| 'string' | 'number' | 'object' | 'undefined',
     *                value: JSON.stringify(source.at[index]) 
     *              } ]
     *    }
     * 
     *    Note 1: the data types are using the cTypeNameXxxxx string constants to describe types
     *    Note 2: objects in data are 
     * 
     * 2) This object is stringified with JSON.stringify()
     * @param {any[]} source is a array to convert into a string
     * @param {string} controlDescr is an optional string to provide to the 'control' field of
     *                  the returned stringified object
     * @param {string} ifError is the value to return if an error occurs (default='')
     * @returns {string} is the safely stringified result with the above structure
     */
    export function safeStringifyArray ( source: any[],
                                         controlDescr: string = cNullString,
                                         ifError: string = cNullString ): string {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeStringifyArray'

        log().trace(cSourceName, cInfoStarted)

        try {
            
            const sourceData: SafeItemPair[] = []
            source.forEach((value, index) => sourceData.push({ key: safeStringify(index), value: safeStringify(value) }))

            const resultObj: SafeItemList = {
                                                type: cTypeNameArray,
                                                control: controlDescr,
                                                count: source.length,
                                                data: sourceData
                                            }

            return JSON.stringify(resultObj)

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return ifError

        }

    }

    /**
     * Safely transform the provided Map into a string using JSON.stringify() but including
     * including safety conversion information before:
     * 1) An object is created with the following structure:
     *    { type: 'map', 
     *      control: --> controlDescr,
     *      count: --> source.length,
     *      data: [ { key: safeStringify(source.keys[index]
     *                value: safeStringify(source.items[index]) 
     *              } ]
     *    }
     * 
     *    Note 1: the data types are using the cTypeNameXxxxx string constants to describe types
     *    Note 2: objects in data are 
     * 
     * 2) This object is stringified with JSON.stringify()
     * @param {any[]} source is a array to convert into a string
     * @param {string} controlDescr is an optional string to provide to the 'control' field of
     *                  the returned stringified object
     * @param {string} ifError is the value to return if an error occurs (default=cNullString)
     * @returns {string} is the safely stringified result with the above structure
     */
    export function safeStringifyMap ( source: Map<any, any>,
                                       controlDescr: string = cNullString,
                                       ifError: string = cNullString ): string {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeStringifyMap'

        log().trace(cSourceName, cInfoStarted)

        try {
            
            const sourceData: SafeItemPair[] = []
            source.forEach((value, key) => sourceData.push({ key: safeStringify(key), value: safeStringify(value) }))

            const resultObj: SafeItemList = {
                                                type: cTypeNameMap,
                                                control: controlDescr,
                                                count: source.size,
                                                data: sourceData
                                            }

            return JSON.stringify(resultObj)

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return ifError

        }

    }


    /**
     * Safely transform the provided object into a recursive list of string using JSON.stringify() but including
     * including safety conversion information before:
     * 1) An object is created with the following structure:
     *    { type: 'object', 
     *      control: --> controlDescr,
     *      count: --> source.length,
     *      data: [ { key: safeStringify(source.keys[index]
     *                value: safeStringify(source.items[index]) 
     *              } ]
     *    }
     * 
     *    Note 1: the data types are using the cTypeNameXxxxx string constants to describe types
     *    Note 2: objects in data are 
     * 
     * 2) This object is stringified with JSON.stringify()
     * @param {object} source is a JSON-like object to convert into a string
     * @param {string} controlDescr is an optional string to provide to the 'control' field of
     *                  the returned stringified object
     * @param {string} ifError is the value to return if an error occurs (default=cNullString)
     * @returns {string} is the safely stringified result with the above structure
     */
    export function safeStringifyObject ( source: object,
                                          controlDescr: string = cNullString,
                                          ifError: string = cNullString ): string {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeStringifyObject'

        log().trace(cSourceName, cInfoStarted)

        try {
            
            const entries = Object.entries(source)
            const sourceData: SafeItemPair[] = []
            entries.forEach(([key, item]) => sourceData.push({ key: safeStringify(key), value: safeStringify(item) }))

            const resultObj: SafeItemList = {
                                                type: cTypeNameObject,
                                                control: controlDescr,
                                                count: entries.length,
                                                data: sourceData
                                            }

            return JSON.stringify(resultObj)

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return ifError

        }

    }


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
    export function safeStringify ( source: any,
                                    controlDescr: string = cNullString,
                                    ifError: string = cNullString ): string {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeStringify'

        log().trace(cSourceName, cInfoStarted)

        try {

            // Convert source:
            // (1) Basic types
            if (typeof source === cTypeNameBoolean ) {
                const resultObj: SafeItemValue = { type: cTypeNameBoolean, control: controlDescr, value: source.toString() }
                return JSON.stringify(resultObj)
            }

            if (typeof source === cTypeNameString ) {
                const resultObj: SafeItemValue = { type: cTypeNameString, control: controlDescr, value: source }
                return JSON.stringify(resultObj)
            }
            
            if (typeof source === cTypeNameNumber ) {
                const resultObj: SafeItemValue = { type: cTypeNameNumber, control: controlDescr, value: source.toString() }
                return JSON.stringify(resultObj)
            }

            if (typeof source === cTypeNameDate ) {
                const resultObj: SafeItemValue = { type: cTypeNameDate, control: controlDescr, value: source.toISOString() }
                return JSON.stringify(resultObj)
            }

            if (typeof source === cTypeNameUndefined ) {
                const resultObj: SafeItemValue = { type: cTypeNameUndefined, control: controlDescr, value: '' }
                return JSON.stringify(resultObj)
            }

            // (2) Complex type
            if (typeof source === cTypeNameObject ) {
                return safeStringifyObject(source)
            }
            
            if (source instanceof Array) {
                return safeStringifyArray(source, controlDescr)
            }

            if (source instanceof Map) {
                 return safeStringifyMap(source)
            }

            // Invalid object type
            log().raiseError(cSourceName, cRaiseInvalidParameter + ': ' + (typeof source))
            return ifError

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return ifError

        }

    }





    // --------------- Unstringify

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
    export function safeUnstringifyAsAny (source: string,
                                          controlDescr: string = cNullString,
                                          options?: { ifError?: uSafeItem
                                                      noError?: boolean  } ): uSafeItem {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsAny'

        log().trace(cSourceName, cInfoStarted)

        try {

            const resultItem: uSafeItem =  safeUnstringifyAsSafeItem(source,
                                                                     controlDescr,
                                                                     cNullString,
                                                                     options)
            if (resultItem === undefined) {
                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'Cannot convert into a safe object')
                }
                return (options?.ifError)
            }
            return (JSON.parse(resultItem.value))

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return (options?.ifError)

        }

    }

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
    export function safeUnstringifyAsBoolean (source: string,
                                              controlDescr: string = cNullString,
                                              options?: { ifError?: boolean
                                                          noError?: boolean } ): ex.uBoolean {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsBoolean'

        log().trace(cSourceName, cInfoStarted)

        try {

            const resultItem: uSafeItemValue =  safeUnstringifyAsSafeValue(source, controlDescr, cTypeNameBoolean)
            if (resultItem === undefined) {
             
                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'Cannot convert into a safe object or is not a boolean')
                }
                return (options?.ifError)

            }

            return (resultItem.value === 'true')

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return (options?.ifError)

        }

    }

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
    export function safeUnstringifyAsNumber (source: string,
                                             controlDescr: string = cNullString,
                                             options?: { ifError: ex.uNumber
                                                         noError?: boolean } ): ex.uNumber {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsNumber'

        log().trace(cSourceName, cInfoStarted)

        try {

            const resultItem: uSafeItemValue =  safeUnstringifyAsSafeValue(source, controlDescr, cTypeNameNumber)
            if (resultItem === undefined) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'Cannot convert into a safe object or is not a number')
                }
                return (options?.ifError)
            }

            const result: number = Number.parseFloat(resultItem.value)
            return ((isNaN(result)) ? (options?.ifError) : result)

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return (options?.ifError)

        }

    }


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
    export function safeUnstringifyAsString (source: string,
                                             controlDescr: string = cNullString,
                                             options?: { ifError: ex.uString
                                                          noError?: boolean } ): ex.uString {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsString'

        log().trace(cSourceName, cInfoStarted)

        try {

            const resultItem: uSafeItemValue =  safeUnstringifyAsSafeValue(source, controlDescr, cTypeNameString)
            if (resultItem === undefined) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'Cannot convert into a safe object or is not a string')
                }
                return (options?.ifError)
            }

            return (resultItem.value)

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return (options?.ifError)

        }

    }

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
    export function safeUnstringifyAsDate (source: string,
                                           controlDescr: string = cNullString,
                                           options?: { ifError: ex.uDate
                                                       noError?: boolean } ): ex.uDate {

        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsDate'

        log().trace(cSourceName, cInfoStarted)

        try {

            const resultItem: uSafeItemValue =  safeUnstringifyAsSafeValue(source,
                                                                           controlDescr,
                                                                           cTypeNameDate)
            if (resultItem === undefined) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'Cannot convert into a safe object or is not a date')
                }
                return (options?.ifError)
                
            }

            // Convert UTC date/time string into local date/time (by removing the final 'Z' char)
            // https://bobbyhadz.com/blog/javascript-convert-iso-string-to-date-object
            return (new Date(resultItem.value.replace('Z', '')))

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return (options?.ifError)

        }

    }

    /**
     * Unstringifies the provided "source" string into a SafeItem object and make basic
     * safeguard checks to assert it has the required properties of a SafeItem, the
     * provided control value (if provided in controlDescr) and the correct type (if
     * provided in expectedType).
     * @param {string | SafeItem} source is the string to unstringify to retrieve the standard 
     *                  SafeItem object or directly a SafeItem to convert safely
     * @param {string} controlDescr is the required control value the SafeItem must match (ignored
     *                  if empty string)
     * @param {string} expectedType is the expected value of the 'type' field. Fails if not matching
     *                  (note that the types fields are defined using the cTypeNameXxxx consts).
     *                  Is ignored if empty string
     * @param {object} options are the optional options of the function
     * @param {uSafeItem} options.ifError is the value to return if a conversion error occurs
     *                  (default = undefined).
     * @param {boolean} options.noError is used to not raise an error if the conversion fails
     *                  (if true) or to raise an error (if false, default). 
     *                  Note: This flag doesn't remove unexpected errors: only conversion errors
     * @returns {SafeItem | undefined} is the validated SafeItem object of undefined if a
     *                  safeguard control has failed (or if an error occurs)
     */
    function safeUnstringifyAsSafeItem (source: string | SafeItem,
                                        controlDescr: string,
                                        expectedType: string,
                                        options?: { ifError?: uSafeItem
                                                    noError?: boolean }): uSafeItem {
        
        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsSafe'

        log().trace(cSourceName, cInfoStarted)

        try {

            // Interpretation of source object
            let sourceObj: object
            switch (typeof source) {
                case cTypeNameString:
                    sourceObj =  JSON.parse(source as string) as object
                    break

                case cTypeNameObject:
                    sourceObj = source as object
                    break
                
                default:
                    if (!(options?.noError ?? false)) {
                        log().raiseError(cSourceName, cRaiseInvalidParameter + ': not a string of an object (' + (typeof source) + ')')
                    }
                    return (options?.ifError)
            }

            // Check object structure
            if (!objectHasSameProperties(sourceObj, safeItemTemplate)) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'source has not been built with safeStringify()')
                }
                return (options?.ifError)
            
            }

            // We are now sure that the object implements SafeItem
            const result: SafeItem = sourceObj as SafeItem
            if ((controlDescr !== '') && (result.control !== controlDescr)) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, `Expected control (${controlDescr}) is different of found description (${result.control})`)
                }
                return (options?.ifError)

            }

            if ((expectedType !== '') && (result.type !== expectedType)) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, `Expected type (${expectedType}) is different of found type (${result.type})`)
                }
                return (options?.ifError)

            }

            return result

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return options?.ifError

        }
    
    }

    /**
     * Unstringifies the provided "source" string into a SafeItemValue object and make basic
     * safeguard checks to assert it has the required properties of a SafeItem, the
     * provided control value (if provided in controlDescr) and the correct type (if
     * provided in expectedType).
     * @param {string | SafeItem} source is the string to unstringify to retrieve the standard 
     *                  SafeItem object or directly a SafeItem to convert safely
     * @param {string} controlDescr is the required control value the SafeItem must match (ignored
     *                  if empty string)
     * @param {string} expectedType is the expected value of the 'type' field. Fails if not matching
     *                  (note that the types fields are defined using the cTypeNameXxxx consts).
     *                  Is ignored if empty string
     * @param {object} options are the optional options of the function
     * @param {uSafeItemValue} options.ifError is the value to return if a conversion error occurs
     *                  (default = undefined).
     * @param {boolean} options.noError is used to not raise an error if the conversion fails
     *                  (if true) or to raise an error (if false, default). 
     *                  Note: This flag doesn't remove unexpected errors: only conversion errors
     * @returns {SafeItemValue | undefined} is the validated SafeItemValue object of undefined if a
     *                  safeguard control has failed (or if an error occurs)
     */
    function safeUnstringifyAsSafeValue (source: string | SafeItem,
                                         controlDescr: string,
                                         expectedType: string,
                                         options?: { ifError?: uSafeItemValue
                                                     noError?: boolean }): uSafeItemValue {
        
        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsSafeValue'

        log().trace(cSourceName, cInfoStarted)

        try {

            const result: SafeItem =  safeUnstringifyAsSafeItem(source,
                                                                controlDescr,
                                                                expectedType,
                                                                { noError: options?.noError ?? false }) as SafeItem
            if ((result === undefined) || (!objectHasSameProperties(result, safeItemValueTemplate))) {
                
                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'source is not a simple value or has not been built with safeStringify()')
                }
                return options?.ifError
            
            }

            // Done
            return result as SafeItemValue

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return options?.ifError

        }
    
    }

    /**
     * Unstringifies the provided "source" string into a SafeItemList object and make basic
     * safeguard checks to assert it has the required properties of a SafeItem, the
     * provided control value (if provided in controlDescr) and the correct type (if
     * provided in expectedType).
     * @param {string | SafeItem } source is the string to unstringify to retrieve the standard
     *                  SafeItem object of a SafeItem to convert safely
     * @param {string} controlDescr is the required control value the SafeItem must match (ignored
     *                  if empty string)
     * @param {string} expectedType is the expected value of the 'type' field. Fails if not matching
     *                  (note that the types fields are defined using the cTypeNameXxxx consts).
     *                  Is ignored if empty string
     * @param {object} options are the optional options of the function
     * @param {uSafeItemValue} options.ifError is the value to return if a conversion error occurs
     *                  (default = undefined).
     * @param {boolean} options.noError is used to not raise an error if the conversion fails
     *                  (if true) or to raise an error (if false, default). 
     *                  Note: This flag doesn't remove unexpected errors: only conversion errors
     * @returns {SafeItemList | undefined} is the validated SafeItemList object of undefined if a
     *                  safeguard control has failed (or if an error occurs)
     */
    function safeUnstringifyAsSafeList (source: string | SafeItem,
                                        controlDescr: string,
                                        expectedType: string,
                                        options?: { ifError?: uSafeItemList
                                                    noError?: boolean }): uSafeItemList {
        
        const cSourceName = 'exerma_base/exerma_stringify.ts/safeUnstringifyAsSafeList'

        log().trace(cSourceName, cInfoStarted)

        try {

            const safeItemObj: SafeItem = safeUnstringifyAsSafeItem(source, controlDescr, expectedType) as SafeItem
            if ((safeItemObj === undefined) || (!objectHasSameProperties(safeItemObj, safeItemValueTemplate))) {
                
                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, 'source is not a list of items or has not been built with safeStringify()')
                }
                return (options?.ifError)
            
            }

            // Check if the data field contains a list of valid pairs (but don't check recursivly the validity of values)
            const resultObj: SafeItemList = safeItemObj as SafeItemList
            if (!(resultObj.data instanceof Array)) {

                if (!(options?.noError ?? false)) {
                    log().raiseError(cSourceName, cRaiseInvalidParameter + ': no array of value found')
                }
                return (options?.ifError)

            }

            // Check every entry of the array
            const dataArray: any[] = resultObj.data
            dataArray.forEach((value, index) => {

                if (typeof value !== cTypeNameObject) {
                    
                    if (!(options?.noError ?? false)) {
                        log().raiseError(cSourceName, cRaiseInvalidParameter + ': "data" member must be an Array<SafeItemPair>')
                    }
                    return (options?.ifError)

                }

                if (!objectHasSameProperties(value, safeItemPairTemplate)) {

                    if (!(options?.noError ?? false)) {
                        log().raiseError(cSourceName, cRaiseInvalidParameter
                                       + ': every "data" member must be SafeItemPair but index=' + index + ' is not')
                    }
                    return (options?.ifError)

                }

            })

            // Done
            return resultObj

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return (options?.ifError)

        }
    
    }

