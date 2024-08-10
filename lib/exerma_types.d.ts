export type uHTMLElement = HTMLElement | undefined;
export type nHTMLElement = HTMLElement | null;
export type nHTMLInputElement = HTMLInputElement | null;
export type nFileList = FileList | null;
export type nFile = File | null;
export type nBoolean = boolean | null;
export type uBoolean = boolean | undefined;
export type nNumber = number | null;
export type uNumber = number | undefined;
export type nString = string | null;
export type uString = string | undefined;
export type nDate = Date | null;
export type uDate = Date | undefined;
export type MStringString = Map<string, string>;
export type uMStringString = MStringString | undefined;
export type MNumberString = Map<number, string>;
export type uMNumberString = MNumberString | undefined;
export type AString = string[];
export type uAString = AString | undefined;
/**
 * Manage a safe way to determine if an unknown object (type "any") belongs to
 * the ExClass class hierarchy.
 */
/**
 * Manage a safe way to determine if an unknown object (type "any") belongs to
 * the ExClass class hierarchy.
 *
 */
export declare class CClass {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
}
/**
 * Check if an object belongs to a class (directly or by heritage)
 * @param {any} candidate is the undefined class object to check if it is actually
 *                  a class of the "classType" category
 * @param {symbol} classType is the symbol associated to the class type we want
 *                  to check if the candidate belongs to.
 * @returns {boolean} is true if the candidate has the exClassHeritage property and
 *                  this property contains the required classType symbol.
 */
export declare function isCClass(candidate: any, classType: string): boolean;
export declare class CClassTest extends CClass {
    static readonly CClassType: string;
    static readonly CClassHeritage: string[];
    readonly classHeritage: string[];
}
//# sourceMappingURL=exerma_types.d.ts.map