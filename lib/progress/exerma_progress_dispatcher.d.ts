import { type DispatcherReturnType } from '../exerma_messages';
/**
 * Catch and dispatch messages received by the progress window
 * https://developer.chrome.com/docs/extensions/mv3/messaging/
 * @param {any} request is the received message we have to answer to (or not)
 * @param {any} sender is the caller object
 * @param {() => void} sendResponse is a callback function to return the answer with,
 *             but the best practice is to return **synchronously** a Promise object
 *             or return false if the message is not handled
 * @returns {DispatcherReturnType} is a premise if the message was processed,
 *             and is false if the message was not handled
 */
export declare function progressDispatcher(request: any, sender: any, sendResponse: () => void): DispatcherReturnType;
//# sourceMappingURL=exerma_progress_dispatcher.d.ts.map