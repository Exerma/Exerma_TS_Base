import type * as ex from '../exerma_types';
import { CMessage, type exMessageName } from '../exerma_messages';
/**
 * Implements the message used to init progress part of welcome_archive.html
 */
export declare class CMessageProgressStart extends CMessage {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
    readonly progressID: string;
    readonly progressCaption: string;
    readonly progressMax: number;
    /**
     * A message used to requires the state of the application
     * @param {object} params is the list of parameters to provide to this class
     * @param {string} params.sentBy is the name of the function requiring the stat
     * @param {string} params.messageId is the UID of the message (to identify it uniquely)
     * @param {string} params.progressID is the internal ID of the progress to start
     * @param {string} params.progressCaption is the main caption to show to the user
     * @param {number} params.progressMax is the maximum value corresponding to 100%
     */
    constructor(params: {
        sentBy: string;
        messageId: string;
        progressID: string;
        progressCaption: string;
        progressMax: number;
    });
}
export declare const exMessageNameProgressStart: exMessageName;
/**
 * Implements the message used to close a progress bar
 */
export declare class CMessageProgressStep extends CMessage {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
    readonly progressID: string;
    readonly progressMessage: ex.uString;
    readonly progressValue: ex.uNumber;
    /**
     * A message used to requires the state of the application
     * @param {object} params is the list of parameters to provide to this class
     * @param {string} params.sentBy is the name of the function requiring the stat
     * @param {string} params.messageId is the UID of the message (to identify it uniquely)
     * @param {string} params.progressID is the internal ID of the progress to show progress of
     * @param {number} params.progressValue is the new progress value to show
     * @param {string} params.progressMessage is an optional message to show to the user
     */
    constructor(params: {
        sentBy: string;
        messageId: string;
        progressID: string;
        progressValue?: ex.uNumber;
        progressMessage?: ex.uString;
    });
}
export declare const exMessageNameProgressStep: exMessageName;
/**
 * Implements the message used to stop a progress bar
 */
export declare class CMessageProgressStop extends CMessage {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
    readonly progressID: string;
    /**
     * A message used to requires the state of the application
     * @param {object} params is the list of parameters to provide to this class
     * @param {string} params.sentBy is the name of the function requiring the stat
     * @param {string} params.messageId is the UID of the message (to identify it uniquely)
     * @param {string} params.progressID is the internal ID of the progress to stop
     */
    constructor(params: {
        sentBy: string;
        messageId: string;
        progressID: string;
    });
}
export declare const exMessageNameProgressStop: exMessageName;
//# sourceMappingURL=exerma_progress_messages.d.ts.map