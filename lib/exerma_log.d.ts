/**
 * Define the error levels that can be raised
 */
export declare enum ErrLevel {
    errUndefined = 0,// Makes this error level Falsy
    errTrace = 1,
    errDebug = 2,
    errInfo = 3,
    errBenine = 4,
    errError = 5,
    errCritical = 6
}
/**
 * Define the kind of log
 */
export declare enum LogKind {
    logUndefined = 0,
    logSuccess = 1,
    logFailure = 2,
    logStart = 3
}
export declare const cInfoStarted = "Has started";
export declare const cInfoCancelled = "Cancelled";
export declare const cInfoEnded = "Has finished";
export declare const cInfoToImplement = "Not implemented yet";
export declare const cRaiseUnexpected = "Unexpected error";
export declare const cRaiseInvalidParameter = "Invalid parameter value";
export declare const cRaiseUninitialized = "Object is not initialized";
export declare const cRaiseOutOfRange = "Out of range value";
export declare const cRaiseNotFound = "Not found";
export declare class CLogger {
    /**
     * Name of this logger
     * It is shown in every console.log in the {...} part after the date (only if not '')
     */
    private readonly _name;
    /**
     * The infoLevel is the minimum level for which a log entry will be created
     */
    private _infoLevel;
    /**
     * The raiseLevel is the minimum level for which the error will be propagated
     */
    private _raiseLevel;
    /**
     *
     */
    private readonly _logHistory;
    /**
     * Ctor
     * @param {string} name is the internal name of the logger (will be shown in every console.log)
     * @param {ErrLevel} setInfoLevel is the information level to assign (default = {ErrLevel.errInfo})
     * @param {ErrLevel} setRaiseLevel is the re-throwing level to assign (default = {ErrLevel.errCritical})
     */
    constructor(name?: string, setInfoLevel?: ErrLevel, setRaiseLevel?: ErrLevel);
    get levelInfo(): ErrLevel;
    set levelInfo(level: ErrLevel);
    get levelRaise(): ErrLevel;
    set levelRaise(level: ErrLevel);
    /**
     * An error is raised
     * @param {ErrLevel} level is the level of the error
     * @param {string} where is the name of the function raising the error
     * @param {string} what is the description of the error
     * @param {object}  options is a list of optional parameters
     * @param {Error}   options.error is the original Error object if provided. It will be
     *                 propagated if the level of the error requires it.
     * @param {LogKind} options.kind is the kind of message to show additional formatting
     *                 with the message
     */
    raise(level: ErrLevel, where: string, what: string, options?: {
        error?: Error;
        kind?: LogKind;
    }): void;
    /**
     * Show a message (level = ErrLevel.errTrace) in the logging system
     * @param {string} where is same than in raise()
     * @param {string} what is same than in raise()
     */
    trace(where: string, what: string): void;
    /**
     * Show a message (level = ErrLevel.errDebug) in the logging system
     * @param {string} where is same than in raise()
     * @param {string} what is same than in raise()
     */
    debugInfo(where: string, what: string): void;
    /**
     * Show a message (level = ErrLevel.errInfo) in the logging system
     * @param {string} where is same than in raise()
     * @param {string} what is same than in raise()
     */
    raiseInfo(where: string, what: string): void;
    /**
     * Raise a BENINE error (level = ErrLevel.errBenine) in the logging system
     * @param {string} where is same than in raise()
     * @param {string} what is same than in raise()
     * @param {Error} error is same than in raise()
     */
    raiseBenine(where: string, what: string, error?: Error): void;
    /**
     * Raise an ERROR error (level = ErrLevel.errError) in the logging system
     * @param {string} where is same than in raise()
     * @param {string} what is same than in raise()
     * @param {Error} error is same than in raise()
     */
    raiseError(where: string, what: string, error?: Error): void;
    /**
     * Raise a CRITICAL error (level = ErrLevel.errCritical) in the logging system
     * @param {string} where is same than in raise()
     * @param {string} what is same than in raise()
     * @param {Error} error is same than in raise()
     */
    raiseCritical(where: string, what: string, error?: Error): void;
    /**
     * Retrieve the full history as string
     * @returns {string} is the whole history of logged messages
     */
    getHistory(): string;
    /**
     * Retrive the history as an array. This is especially usefuls as some
     * entries can be multilines
     * @returns {string[]} is a copy of the history
     */
    asArray(): string[];
    /**
     * Limit the size (in Ko or in number of entries) of the history
     * @param {number | undefined} newSizeInKb is the maximum length of
     * '           the total strings to let in the history (in kilo-bytes)
     * @param {number | undefined} newCount is the number of entries to keep
     * @returns {boolean} is true if success (if the history was already in the
     *             required limits or if it has been truncated).
     *             Is false if an error occurs
     */
    truncateHistory(newSizeInKb?: number | undefined, newCount?: number | undefined): boolean;
    /**
     * IMPORTANT: This is a simplified and private version of
     * exerma_base/exerma_misc/numberToStringRightAlign used to process faster
     * (thanks to less options) and not using the log() function to
     *
     *                     _avoid infinite recurivity_
     *
     * It right align an integer number by adding zeros on the left
     * If the number needs more digits than "count" then it will not be truncated
     * @param {number} intValue the integer number to right align with zeros
     * @param {number} count the minimum number of digits that should be visible
     * @returns {string} is a right aligned with the provided leftchar
     */
    private logNumberToStringRightAlign;
}
/**
 * Get the main centralized logger
 * @param {string} name is the name of the log to retrieve
 * @returns {CLogger} is the main logger object (built on demand)
 */
export declare function log(name?: string): CLogger;
export default log;
//# sourceMappingURL=exerma_log.d.ts.map