import { ApiExceptionFormat } from "../abstract/ApiExceptionFormat";
import { ENV, KEY_CODES_GERMAN_LETTERS } from "./constants";
import { fetchAnyReturnBlobUrl } from "./fetchUtils";


export function log(text?: any, debug = false): void {

    if (!debug) {
        console.log(text);
        return;
    }

    try {
        throw Error(text);
        
    } catch (e) {
        console.log(e);
    }
}


export function logWarn(text?: any): void {

    try {
        throw Error(text);
        
    } catch (e) {
        console.warn(e);
    }
}


export function logError(text?: any): void {

    try {
        throw Error(text);
        
    } catch (e) {
        console.error(e);
    }
}


/**
 * Log the all props of given {@link ApiExceptionFormat} response and include the stacktrace.
 * 
 * @param response idealy formatted as {@link ApiExceptionFormat}
 */
export function logApiResponse(response: ApiExceptionFormat): void {

    logError(getTimeStamp() + " " +  response.error + "(" + response.status + "): " + response.message + (response.path ? " " + response.path : ""));
}


export function stringToNumber(str: string | number): number {

    if (typeof str === "number")
        return str;
    
    try {
        return Number.parseFloat(str);

    } catch (e) {
        logError(e);
        return -1;
    }
}


export function isNumberFalsy(num: number | null | undefined): boolean {

    return num === undefined || num === null || isNaN(num);
}


export function isBooleanFalsy(bool: boolean | null | undefined) {

    return bool === undefined || bool === null;
}


/**
 * @param str string to check
 * @param debug if true the error will be logged. Default is false
 * @returns true if given string is empty or only contains white space chars
 */
export function isBlank(str: string | undefined | null, debug = false): boolean {

    if (!str && str !== "") {
        if (debug)
            logError("Falsy input str: " + str);
        return true;
    }

    str = str.trim();

    return str.length === 0;
}


/**
 * @param str string to check
 * @param debug if true the error will be logged. Default is false
 * @returns true if and only if ```str.length === 0``` is true 
 */
export function isEmpty(str: string, debug = false): boolean {

    if (!str && str !== "") {
        if (debug)
            logError("Falsy input str: " + str);
        return false;
    }

    return str.length === 0;
}


/**
 * @param length num chars the string should have
 * @returns random string of of alphanumeric chars with given length
 */
export function getRandomString(length = 12): string {

    return Math.random().toString(36).substring(2, length + 2);
}


/**
 * Insert given ```insertionString``` into given ```targetString``` after given index.
 * 
 * I.e: ```insertString("Hello", "X", 1)``` would return ```HXello```.
 * 
 * @param targetString string to insert another string into
 * @param insertionString string to insert 
 * @param insertionIndex index in ```targetString``` to insert into, i.e ```insertionIndex = 0``` would insert at the start
 * @returns result string, does not alter ```targetString```
 */
export function insertString(targetString: string, insertionString: string, insertionIndex: number): string {

    let leftHalft = targetString.substring(0, insertionIndex);
    const rightHalf = targetString.substring(insertionIndex);

    leftHalft += insertionString;

    return leftHalft + rightHalf;
}


/**
 * @param keyCode code of the key e.g ```65``` for letter 'A'
 * @returns true if key is either a letter or a number
 */
export function isKeyAlphaNumeric(keyCode: number): boolean {

    if (isNumberFalsy(keyCode)) {
        logError("Failed to determine if key is alpha numeric. 'keyCode' is falsy.");
        return false;
    }

    return (keyCode >= 48 && keyCode <= 57) || // numbers
           (keyCode >= 65 && keyCode <= 90) || // letters
           KEY_CODES_GERMAN_LETTERS.includes(keyCode); // some german letters
        //    keyCode === 32 || // "Space"
        //    keyCode === 9; // "Tab"
}


function confirmPageUnloadEvent(event): void {

    event.preventDefault();
    event.returnValue = "";
}


/**
 * Create a hidden ```<a href="url" download></a>``` element, click it and remove it from the dom afterwards. Optionally handle
 * given url with {@link fetchAnyReturnBlobUrl} first.
 * Create a hidden ```<a href="url" download></a>``` element, click it and remove it from the dom afterwards. Optionally handle
 * given url with {@link fetchAnyReturnBlobUrl} first.
 * 
 * @param url to make the download request to
 * @param fileName name of file to use for download. If empty, the response header will be searched for a filename
 * @param fetchBlob if true, the given url will be handled by {@link fetchAnyReturnBlobUrl} method first, before beeing passed to ```<a></a>``` tag. 
 *                  In that case, the fileName param should be passed as well or no fileName will be specified at all.
 *                  If false, the given url will be passed directly to ```<a></a>``` tag. Http method should be "get" in that case.
 *                  Default is true
 * @param method http method to use for fetch. Default is "get"
 * @param body to send with the request
 * @param headers json object with strings as keys and values
 * @returns error response as {@link ApiExceptionFormat} if ```fetchBlob``` or nothing if all went well 
 */
export async function downloadFileByUrl(url: string, 
                                        fileName?: string, 
                                        fetchBlob = true,
                                        method = "get", 
                                        body?: object, 
                                        headers = {"Content-Type": "application/octet-stream"} 
                                        ): Promise<ApiExceptionFormat | void> {

    // case: fetch blob first
    if (fetchBlob) {
        const response = await fetchAnyReturnBlobUrl(url, method, body, headers);

        // case: successfully generated url from blob
        if (typeof response === "string")
            url = response;
        else
            return response;
    }

    // create link
    const linkElement = document.createElement('a');

    // add props
    linkElement.href = url;
    if (fileName)
        linkElement.download = fileName;

    // add props
    linkElement.href = url;
    if (fileName)
        linkElement.download = fileName;
    linkElement.style.display = 'none';

    // append
    document.body.appendChild(linkElement);
  
    // trigger link
    linkElement.click();
  
    // remove
    document.body.removeChild(linkElement);
}


/**
 * Cut given number of digits from cssValue and try to parse substring to number.
 * 
 * @param cssValue css value e.g: 16px
 * @param unitDigits number of digigts to cut of cssValue string
 * @returns substring of cssValue parsed to number or NaN if parsing failed
 */
export function getCSSValueAsNumber(cssValue: string | number, unitDigits: number): number {

    if (typeof cssValue === "number")
        return cssValue;

    const length = cssValue.length;
    if (unitDigits >= length) {
        // case: is numeric
        if (isStringNumeric(cssValue, true))
            return stringToNumber(cssValue);

        logError("Failed to get css value as number. 'unitDigits' (" + unitDigits + ") too long or 'cssValue' (" + cssValue + ") too short.");
    }

    const endIndex = cssValue.length - unitDigits;

    return stringToNumber(cssValue.substring(0, endIndex));
}


/**
 * Confirm page refresh, tab close and window close with browser popup.<p>
 * 
 * Do nothing if ```ENV``` is "dev".
 */
export function confirmPageUnload(): void {

    if (ENV === "dev")
        return;

    // confirm page refresh / tab close / window close
    window.addEventListener("beforeunload", confirmPageUnloadEvent);
}


export function removeConfirmPageUnloadEvent(): void {

    window.removeEventListener("beforeunload", confirmPageUnloadEvent);
}


/**
 * @param str string to replace a char in
 * @param replacement string to use as replacement
 * @param startIndex of chars to replace in ```str```
 * @param endIndex of chars to replace in ```str``` (not included), default is ```str.length```
 * @returns string with replacement at given position (does not alter ```str```)
 */
export function replaceAtIndex(str: string, replacement: string, startIndex: number, endIndex = str.length): string {

    const charsBeforeIndex = str.substring(0, startIndex);
    const charsBehindIndex = str.substring(endIndex);

    return charsBeforeIndex + replacement + charsBehindIndex;
}


/**
 * @param expected first value to compare
 * @param actual second value to compare
 * @returns ```expected === actual``` after calling ```toLowerCase()``` on both values.
 *          Types wont be considered: ```"1" === 1 = true```
 */
export function equalsIgnoreCase(expected: string | number, actual: string | number): boolean {

    if (!expected || !actual)
        return expected === actual;

    expected = expected.toString().toLowerCase();
    actual = actual.toString().toLowerCase();

    return expected === actual;
}


/**
 * @param expected first value to compare
 * @param actual second value to compare
 * @returns ```expected === actual``` after calling ```trim()``` and ```toLowerCase()``` on both values.
 *          Types wont be considered: ```"1" === 1 = true```
 */
export function equalsIgnoreCaseTrim(expected: string | number, actual: string | number): boolean {

    if (!expected || !actual)
        return expected === actual;

    expected = expected.toString().trim().toLowerCase();
    actual = actual.toString().trim().toLowerCase();

    return expected === actual;
}


/**
 * @param arr array to search in
 * @param value string or number to look for
 * @returns true if value is included in array. Uses {@link equalsIgnoreCase} for comparison instead of ```includes()```.
 */
export function includesIgnoreCase(arr: (string | number)[] | string, value: string | number): boolean {

    // case: arr is string
    if (typeof arr === "string")
        return arr.toLowerCase().includes(value.toString().toLowerCase());

    const result = arr.find(val => equalsIgnoreCase(val, value));

    return result ? true : false;
}


/**
 * @param arr array to search in
 * @param value string or number to look for
 * @returns true if value is included in array. Uses {@link equalsIgnoreCaseTrim} for comparison instead of ```includes()```.
 */
export function includesIgnoreCaseTrim(arr: (string | number)[] | string, value: string | number): boolean {
        
    // case: arr is string
    if (typeof arr === "string")
        return arr.trim().toLowerCase().includes(value.toString().trim().toLowerCase());

    const result = arr.find(val => equalsIgnoreCaseTrim(val, value));

    return result ? true : false;
}


/**
 * @param str to check 
 * @param regexp pattern to use for checking
 * @returns true if and only if all chars in given string match given pattern, else false
 */
export function matchesAll(str: string, regexp: RegExp): boolean {

    // iterate chars
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (char.match(regexp) === null)
            return false;
    }

    return true;
}


export function isStringAlphaNumeric(str: string): boolean {

    // alpha numeric regex
    const regexp = /^[a-z0-9ßäÄöÖüÜ]+$/i;

    return matchString(str, regexp);
}


/**
 * @param str to check
 * @returns true if every char of given string matches regex. Only alphabetical chars including german exceptions
 *          'ßäÄöÖüÜ' are a match (case insensitive).
 */
export function isStringAlphabetical(str: string): boolean {

    // alpha numeric regex
    const regexp = /^[a-zßäÄöÖüÜ]+$/i;

    return matchString(str, regexp);
}


/**
 * @param str to check
 * @param considerDouble if true, ',' and '.' will be included in the regex
 * @returns true if every char of given string matches the numeric regex
 */
export function isStringNumeric(str: string, considerDouble = false): boolean {

    // alpha numeric regex
    let regexp = /^[0-9]+$/;

    if (considerDouble)
        regexp = /^[0-9.,]+$/;

    return matchString(str, regexp);
}


export function setCssVariable(variableName: string, value: string): void {

    document.documentElement.style.setProperty("--" + variableName, value);
}


export function getCssVariable(variableName: string): string {

    return document.documentElement.style.getPropertyValue("--" + variableName);
}


/**
 * @param str to check
 * @param regexp to use for matching
 * @returns true if every char of string matches the regex, trims the string first
 */
function matchString(str: string, regexp: RegExp): boolean {

    str = str.trim();

    let matches = true;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char.match(regexp) === null) {
            matches = false;
            break;
        }
    }

    return matches
}


/**
 * Makes user confirm and prevents default event if confirm alert was canceld. Only confirm if 
 * current location matches at least one of ```props.pathsToConfirm```.<p>
 * 
 * Do nothing if ```ENV``` is "dev"
 * 
 * @param currentPath path of current url
 * @param pathsToConfirm list of paths that should use the confirm popup
 * @param event that triggered the navigation
 */
export function confirmNavigateEvent(currentPath: string, pathsToConfirm: string[], event: any): void {

    if (ENV === "dev")
        return;

    const confirmLeaveMessage = "Seite verlassen? \nVorgenommene Änderungen werden unter Umständen nicht gespeichert."

    if (pathsToConfirm.includes(currentPath) && !window.confirm(confirmLeaveMessage))
        event.preventDefault();
}


/**
 * Makes user confirm and prevents default event if confirm alert was canceld. Only confirm if 
 * currentPath matches at least one of ```props.pathsToConfirm```, else simply excute the callback without confirmation.
 * 
 * @param currentPath path of current url
 * @param callback optional. Execute on confirm
 * @param pathsToConfirm list of paths that should use the confirm popup
 */
export function confirmNavigateCallback(currentPath: string, callback?: () => any, ...pathsToConfirm: string[]): void {

    const confirmLeaveMessage = "Seite verlassen? \nVorgenommene Änderungen werden unter Umständen nicht gespeichert."

    if (pathsToConfirm.includes(currentPath) && !window.confirm(confirmLeaveMessage))
        return;

    if (callback)
        callback();
}


/**
 * Call given callback function inside try catch block and return ```null``` if error is caught.
 * 
 * @param callback function without params that is called inside try catch
 * @param debug if true the error will be logged. Default is false
 * @returns the callbacks return value or null in case of error
 */
export function tryCatchReturnNull(callback: () => any, debug = false): any {

    try {
        return callback();

    } catch (e) {
        if (debug) 
            logError(e);
    
        return null;
    }
}


/**
 * Call given callback function inside try catch block and return nothing if error is caught.
 * 
 * @param callback function without params that is called inside try catch
 * @param debug if true the error will be logged. Default is false
 * @returns the callbacks return value or nothing in case of error
 */
export function tryCatchReturnNothing(callback: () => any, debug = false): any {

    try {
        return callback();

    } catch (e) {
        if (debug) 
            logError(e);
    }
}


/**
 * @param debug if true, given message will be logged
 * @param message to log if debug is true
 * @returns null
 */
export function logReturnNull(debug: boolean, message?: string): null {

    if (debug)
        logError(message || "No message");

    return null;
}


/**
 * @param debug if true, given message will be logged
 * @param message to log if debug is true
 */
export function logReturnNothing(debug: boolean, message?: string): void {

    if (debug)
        logError(message || "No message");
}


// TODO: tests
export function dateEquals(d1: Date | undefined, d2: Date | undefined): boolean {
    
    // check undefined
    if (!d1) {
        if (d2)
            return false;

        return true;

    } else if (!d2)
        return false;

    // copy to new object, dont consider time
    const date1 = clearTimeFromDate(new Date(d1));
    const date2 = clearTimeFromDate(new Date(d2));
    
    return date1.getTime() === date2.getTime();
}


// TODO: tests
export function clearTimeFromDate(d: Date): Date {

    const date = new Date(d);

    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);

    return date;
}


/**
 * @param date to format, default is ```new Date()```
 * @returns nicely formatted string formatted like ```year-month-date hours:minutes:seconds:milliseconds```
 */
function getTimeStamp(date = new Date()): string {

    return date.getFullYear() + "-" + prepend0ToNumber(date.getMonth() + 1) + "-" + prepend0ToNumber(date.getDate()) + " " + 
           prepend0ToNumber(date.getHours()) + ":" + prepend0ToNumber(date.getMinutes()) + ":" + prepend0ToNumber(date.getSeconds()) + ":" + date.getMilliseconds();
}


/**
 * @param num to prepend a 0 to
 * @returns a string representation of given number with a 0 prended if the number has only one digit
 */
function prepend0ToNumber(num: number): string {

    let str = num.toString();

    // case: one digit only
    if (num / 10 < 1)
        str = "0" + str;

    return str;
}