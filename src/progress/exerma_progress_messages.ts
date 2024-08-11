/* ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2023-2024  
 * ---------------------------------------------------------------------------
 *  exerma_progress_messages.ts
 * ---------------------------------------------------------------------------
 *
 *  
 * 
 * Versions:
 *   2024-07-20: First version
 * 
 */

    // ---------- Imports
    import type * as ex                       from '../exerma_types'
    import { cNullString }                    from '../exerma_consts'
    import { CMessage, type exMessageName }   from '../exerma_messages'


    // ---------- Extend list of available messages

    // ---------- Show save progress to user

    /**
     * Implements the message used to init progress part of welcome_archive.html
     */
    export class CMessageProgressStart extends CMessage {

        // Extends CClass
        static readonly CClassType: string = 'CMessageProgressStart'
        static readonly CClassHeritage: string[] = [...CMessage.CClassHeritage, CMessageProgressStart.CClassType]
        public readonly classHeritage: string[] = CMessageProgressStart.CClassHeritage

        // Class members
        public readonly progressID: string
        public readonly progressCaption: string
        public readonly progressMax: number

        /**
         * A message used to requires the state of the application
         * @param {object} params is the list of parameters to provide to this class
         * @param {string} params.sentBy is the name of the function requiring the stat
         * @param {string} params.messageId is the UID of the message (to identify it uniquely)
         * @param {string} params.progressID is the internal ID of the progress to start
         * @param {string} params.progressCaption is the main caption to show to the user
         * @param {number} params.progressMax is the maximum value corresponding to 100%
         */
        constructor (params: {
                        sentBy: string           // CMessage
                        messageId: string        // CMessage
                        progressID: string
                        progressCaption: string
                        progressMax: number
                        }) {
                            super({
                                name: exMessageNameProgressStart,
                                sentBy: params.sentBy,
                                messageId: params.messageId
                            })
                            this.progressID = params.progressID
                            this.progressCaption = params.progressCaption
                            this.progressMax = params.progressMax
                    }

    }
    export const exMessageNameProgressStart: exMessageName = 'progressStart'


    /**
     * Implements the message used to close a progress bar
     */
    export class CMessageProgressStep extends CMessage {

        // Extends CClass
        static readonly CClassType: string = 'CMessageProgressStep'
        static readonly CClassHeritage: string[] = [...CMessage.CClassHeritage, CMessageProgressStep.CClassType]
        public readonly classHeritage: string[] = CMessageProgressStep.CClassHeritage

        // Class members
        public readonly progressID: string
        public readonly progressMessage: ex.uString
        public readonly progressValue: ex.uNumber

        /**
         * A message used to requires the state of the application
         * @param {object} params is the list of parameters to provide to this class
         * @param {string} params.sentBy is the name of the function requiring the stat
         * @param {string} params.messageId is the UID of the message (to identify it uniquely)
         * @param {string} params.progressID is the internal ID of the progress to show progress of
         * @param {number} params.progressValue is the new progress value to show
         * @param {string} params.progressMessage is an optional message to show to the user
         */
        constructor (params: {
                        sentBy: string           // CMessage
                        messageId: string        // CMessage
                        progressID: string
                        progressValue?: ex.uNumber
                        progressMessage?: ex.uString
                        }) {
                            super({
                                name: exMessageNameProgressStep,
                                sentBy: params.sentBy,
                                messageId: params.messageId
                            })
                            this.progressID = params.progressID
                            this.progressValue = params?.progressValue
                            this.progressMessage = params?.progressMessage
                    }

    }
    export const exMessageNameProgressStep: exMessageName = 'progressStep'


    /**
     * Implements the message used to stop a progress bar
     */
    export class CMessageProgressStop extends CMessage {

        // Extends CClass
        static readonly CClassType: string = 'CMessageProgressStop'
        static readonly CClassHeritage: string[] = [...CMessage.CClassHeritage, CMessageProgressStop.CClassType]
        public readonly classHeritage: string[] = CMessageProgressStop.CClassHeritage

        // Class members
        public readonly progressID: string

        /**
         * A message used to requires the state of the application
         * @param {object} params is the list of parameters to provide to this class
         * @param {string} params.sentBy is the name of the function requiring the stat
         * @param {string} params.messageId is the UID of the message (to identify it uniquely)
         * @param {string} params.progressID is the internal ID of the progress to stop
         */
        constructor (params: {
                        sentBy: string           // CMessage
                        messageId: string        // CMessage
                        progressID: string
                        }) {
                            super({
                                name: exMessageNameProgressStop,
                                sentBy: params.sentBy,
                                messageId: params.messageId
                            })
                            this.progressID = params.progressID
                    }

    }
    export const exMessageNameProgressStop: exMessageName = 'progressStop'
