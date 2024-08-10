import type { uHTMLElement, nHTMLElement, uBoolean } from './exerma_types';
/**
 * Retrieve an element from the DOM and build it if not found
 * @param {Document} domDoc is the DOM document to retrieve an entry from
 * @param {string} elementId is the ID of the element to retrieve or to create on demand
 * @param {string} htmlEntry is the string of the object to create on demand
 *                  if not already existing (example: `<input type="file" />`)
 * @param {string} addToParentId is the ID of the parent element to add the new element
 *                  as a child of. If empty string, then add to the body of
 *                  the domDoc object (if provided but not found, then fails)
 * @returns {Promise<nHTMLElement>} is the required element
 */
export declare function getElementBuildOnDemand(domDoc: Document, elementId: string, htmlEntry: string, addToParentId?: string): Promise<nHTMLElement>;
/**
 * Create an element and, optionally, add it as child of another element
 * @param {Document} doc is the document to use for creation / addition
 * @param {keyof HTMLElementTagNameMap} tag is the tag of the element to create
 * @param {object} options is a list of options to apply to the created element
 * @param {string} options.innerHtml is an optional HTML content to inject into
 *             the newly created element with innerHtml
 * @param {string} options.innerText is an optional text to inject into the
 *             newcly created element with innerText
 * @param {{ name: string, value: string } | Map<string, string>} options.setAttribute
 *             is used to add a single attribute or a list of attributes to the newly
 *             created element. Multiple occurrence of the same attribute will add
 *             successive values separated by space
 * @param {HTMLElement} options.target is an optional element to add the newly
 *             created as child of it. The position can be defined with the
 *             targetPosition parameter
 * @param {string} options.targetId is used to search for the target element by Id
 *             if options.target is undefined.
 *             If none of options.target and options.targetId allows the function
 *             to get a valid target, then the element will not be added but
 *             is returned as is
 * @param {InsertPosition} options.insertPosition is used to define how to insert the
 *             newly created relatively to the target (if provided/found)
 *             (default: add as last child)
 *             https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
 * @returns {uHTMLElement} is the newly created element or undefined if an error occurs
 */
export declare function createAndAddElement(doc: Document, tag: keyof HTMLElementTagNameMap, options?: {
    innerHtml?: string;
    innerText?: string;
    setAttribute?: Array<{
        name: string;
        value: string;
    }>;
    target?: HTMLElement;
    targetId?: string;
    insertPosition?: InsertPosition;
}): uHTMLElement;
/**
 * Look for an Html element by Id and assign a value to one of her attribute (if found)
 * @param {Document} doc is the HTML DOM document to alter an element of
 * @param {string} elementId is the Id of the element to alter the display property of
 * @param {string} attribute is the name of the property to alter
 * @param {string} value is the new value to assign to the required property
 * @returns {Promise<boolean>} is true if success, false if an error occurs
 */
export declare function setElementByIdAttribute(doc: Document, elementId: string, attribute: string, value: string): Promise<boolean>;
/**
 * # Set content of a DOM element
 *
 * Look for an Html element by Id and assign its text value (if found)
 *
 * Versions: 29.07.2024
 * @param {Document} doc is the HTML DOM document to alter an element of
 * @param {string} elementId is the Id of the element to alter the content of
 * @param {string} value is the new value to assign to the contant
 * @param {boolean} isHtml is true if 'value' is an Html text, false if it is a
 *                  simple text string
 * @returns {Promise<boolean>} is true if success, false if an error occurs
 */
export declare function setElementByIdInnerContent(doc: Document, elementId: string, value: string, isHtml: boolean): Promise<boolean>;
/**
 * Get the state (checked or not) of a checkbox input field
 * @param {Document} doc is the HTML DOM document to alter an element of
 * @param {string} checkboxId is the ID of the checkbox to get the state of
 * @param {uBoolean} ifError is the value to return if the checkbox wasn't
 *                  found or if it is not a checkbox input field (default = undefined)
 * @returns {boolean} is true if the checkbox is checked, false if not, or
 *                  undefined if the checkbox wasn't found
 */
export declare function getCheckboxStateById(doc: Document, checkboxId: string, ifError?: uBoolean): Promise<boolean | undefined>;
//# sourceMappingURL=exerma_dom.d.ts.map