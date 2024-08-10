/* ---------------------------------------------------------------------------
 *  (c) Patrick Seuret, 2024
 * ---------------------------------------------------------------------------
 *  exerma_progress.ts
 * ---------------------------------------------------------------------------
 *
 * This windows shows progression steps
 * 
 * Versions:
 *   2024-07-20: First version
 * 
 */

    // --------------- Imports
    import type * as ex                                 from '../exerma_types'
    import { cEventClick, cEventLoad, cNullString }     from '../exerma_consts'
    import { createAndAddElement }                      from '../exerma_dom'
    import log, { cRaiseUnexpected, cInfoStarted }      from '../exerma_log'
    import { progressDispatcher }                       from './exerma_progress_dispatcher'
    import { exLangFuture }                             from '../exerma_lang'
    


    // ----- Popup page for progression
    const cHtmlPopProgressText:                   string = 'progresstext'
    const cHtmlPopProgressProgressbar:            string = 'progressbar'

    // --------------- Local members


