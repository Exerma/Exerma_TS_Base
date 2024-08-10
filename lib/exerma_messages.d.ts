import { CClass } from './exerma_types';
export type exMessageName = string;
/**
 * This is *our* standard return type for runtime.onMessage() listener (we call it
 * "dispatcher"). We choose to always return "false" for unhandled message and a
 * Promise<any> for handled messages
 */
export type DispatcherReturnType = boolean;
/**
 * Exerma messages are always made of:
 * @param {string} name it the name of the message (which is unique in the application
 *             through the exMessageNames namespace)
 * @param {string} sentBy is the name of the sender (typically the cSourceName const)
 *             which allow differenciated response
 * @param {string} messageId is an optional unique message identifier (per caller)
 *             allowing to uniquely associate the returned message. This ID can be used
 *             in the response to create a kind of conversation
 * Data have to be message specific
 */
export declare class CMessage extends CClass {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
    readonly name: exMessageName;
    readonly sentBy: string;
    readonly messageId: string;
    constructor(params: {
        name: exMessageName;
        sentBy: string;
        messageId: string;
    });
}
/**
 * Example of a message used to require the state of the application
 * (see exerma_states.ts)
 * Note: Unique name of this message is defined after the class
 */
export declare class CMessageGetState extends CMessage {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
    readonly dummy: string;
    /**
     * A message used to requires the state of the application
     * @param {object} params is the list of parameters to provide to this class
     * @param {string} params.sentBy is the name of the function requiring the stat
     * @param {string} params.messageId is the UID of the message (to identify it uniquely)
     * @param {string} params.dummy is a dummy parameter as example
     */
    constructor(params: {
        sentBy: string;
        messageId: string;
        dummy: string;
    });
}
export declare const exMessageNameGetState: exMessageName;
/**
 * Check if the provided "request-candidate" has the same name than the requires
 * message name
 * @param {any}    request is the object to check if it is a message with the required name
 * @param {string} classType is the static CClassType value of the class to test against.
 *                  Default is to check if a CMessage descendant but it is possible (and
 *                  advised) to check for a specific message constant.
 * @returns {boolean} is true if the request has the required name, false if not
 *                  (including if the request is not an object or doesn't have a name)
 */
export declare function isCMessage(request: any, classType?: string): boolean;
//# sourceMappingURL=exerma_messages.d.ts.map