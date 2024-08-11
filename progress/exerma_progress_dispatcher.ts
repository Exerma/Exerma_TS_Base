/* ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2023-2024
 * ---------------------------------------------------------------------------
 *  exerma_progress_dispatcher.ts
 * ---------------------------------------------------------------------------
 *
 * Manage messages used to show progress to the user
 * 
 * Versions:
 *   2024-07-20: First version
 * 
 */

    // --------------- Imports
    import log, { cRaiseUnexpected }             from '../exerma_log'
    import { isCClass }                          from '../exerma_types'
    import {
            CMessageProgressStart,
            CMessageProgressStep,
            CMessageProgressStop
            }                                    from './exerma_progress_messages'
    import {
            type DispatcherReturnType,
            isCMessage
            }                                    from '../exerma_messages'
 

    // --------------- Dispatcher implementation
    // --------------- Dispatcher implementation

    // eslint-disable-next-line jsdoc/no-undefined-types
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
    export function progressDispatcher (request: any,
                                        sender: any,
                                        sendResponse: () => void): DispatcherReturnType {

        const cSourceName = 'exerma_base/progress/exerma_progress_dispatcher.ts/progressDispatcher'

        try {

            // Start a new progress bar
            if (isCClass(request, CMessageProgressStart.CClassType)) {
                
                const message: CMessageProgressStart = (request as CMessageProgressStart)

                // Main process starts initialisation
                log().debugInfo(cSourceName, 'Message received: ' + request.name)

                // void saveProgressInit(message.nbMails)
                sendResponse()
                return true

            }

            // Advance a progress bar
            if (isCClass(request, CMessageProgressStep.CClassType)) {
                
                const message: CMessageProgressStep = (request as CMessageProgressStep)

                // Main process starts initialisation
                log().debugInfo(cSourceName, 'Message received: ' + request.name)

                // void saveProgressClose()
                sendResponse()
                return true

            }

            // Close a progress bar
            if (isCClass(request, CMessageProgressStop.CClassType)) {
                
                const message: CMessageProgressStop = (request as CMessageProgressStop)

                // Main process starts initialisation
                log().debugInfo(cSourceName, 'Message received: ' + request.name)

                // void saveProgressClose()
                sendResponse()
                return true

            }



            // Message not managed
            return false

        } catch (error) {
            
            log().raiseError(cSourceName, cRaiseUnexpected, error as Error)
            return false

        }

    }
