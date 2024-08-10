/**
 * Retrieve the folder path separator
 *
 * Versions: 23.02.2024
 * @returns {string} is the char used as folder separator in a path
 */
export declare function getDirectoryPathSep(): string;
/**
 * Check if the provided string ends with a path separator char.
 * Note that this functions doesn't check the validity of the string as a
 * real directory but only if it ends with a path separator or not
 *
 * Versions: 23.02.2024
 * @param {string} fullname is the string to check if a valid path or not
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @returns {boolean} is true if the fullname ends with a path separator
 */
export declare function isPathName(fullname: string, options?: {
    pathSep?: string;
}): boolean;
/**
 * Retrieve the path part of a full filename
 *
 * Versions: 23.02.2024
 * @param {string} fullname is the path+filename fullname to extract the path of
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @returns {string} is the path part of the provided fullname. If fullname is a path (finishing with
 *                  path separator) then return it. The returned path includes the final '/' char
 *                  Is empty if fullname is empty or has no path part
 */
export declare function extractPath(fullname: string, options?: {
    pathSep?: string;
}): string;
/**
 * Retrieve the file part of a full filename
 *
 * Versions: 23.02.2024
 * @param {string} fullname is the path+filename fullname to extract the filename of
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @returns {string} is the path part of the provided fullname. If fullname is a path (finishing with
 *                  path separator) then return it. The returned path includes the final '/' char
 *                  Is empty if fullname is empty or has no path part
 */
export declare function extractFilename(fullname: string, options?: {
    pathSep?: string;
}): string;
/**
 * Add a final '/' if the provided path doesn't include it
 *
 * Versions: 23.02.2024
 * @param {string} path is the path to add a tailing separator if not already set
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @returns {string} is the path string including a tailing pathSep if not already set
 *                  If path is an empty string, then return an empty string
 */
export declare function addDirectoryTail(path: string, options?: {
    pathSep?: string;
}): string;
/**
 * Build the "path + filename" from the provided path and filename
 * ---
 * Versions: 23.02.2024
 * ---
 * @param {string} path is the path to set (if it contains a filename, them it is removed)
 * @param {string} filename is the filename to use (if it contains a path, then it is removed)
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @param {string} options.setExt is used to set the extention of the filename
 * @returns {string} is the path + filename string including a separating pathSep
 */
export declare function buildFullname(path: string, filename: string, options?: {
    pathSep?: string;
    setExt?: string;
}): string;
/**
 * Extract the extension of the provided filename
 *
 * Versions: 23.02.2024
 * @param {string} filename is the filename to extract the extension of
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @returns {string} is the found extension or an empty string if none was found
 */
export declare function extractFileExt(filename: string, options?: {
    pathSep?: string;
}): string;
/**
 * Extract the body of the provided filename. The body is the part between the path (if
 * provided) and the dot of the extension (if provided).
 * Example: extractFileBody('path/foo.bar') returns 'foo'
 *
 * Versions: 23.02.2024
 * @param {string} filename is the filename to extract the body of
 * @param {object} options are the optional parameters
 * @param {string} options.pathSep is the path separator to use (instead of getDirectoryPathSep())
 * @returns {string} is the body part of the provided filename or empty if there is
 *                  no file body
 */
export declare function extractFileBody(filename: string, options?: {
    pathSep?: string;
}): string;
/**
 * Replace existing extension by the provided one. If the filename has no
 * extension, then the required extension is added
 *
 * Versions: 23.02.2024
 * @param {string} filename is the filename to replace the extension of
 * @param {string} newExt is the new extension to set to the filename.
 *                  If empty then the final dot will stay with no text after
 * @returns {string} is the filename modified with the new extension.
 *                  If the filename was including a path, the path stays
 */
export declare function replaceFileExt(filename: string, newExt: string): string;
/**
 * Set the extension of the file (add it). If the filename has a final dot ('.')
 *
 * Versions: 23.02.2024
 * then no additional '.' is added
 * @param {string} filename is the filename to replace the extension of
 * @param {string} setExt is the extension to set to the filename.
 *                  If empty then do nothing
 * @returns {string} is the filename modified with the new extension.
 *                  If the filename was including a path, the path stays
 */
export declare function setFileExt(filename: string, setExt: string): string;
/**
 * Remove forbidden chars from the provided extension (replace them by '_')
 *
 * Versions: 23.02.2024
 * @param {string} ext is the extension to remove the forbidden chars of
 * @returns {string} is the cleaned extension text
 */
export declare function cleanFileExt(ext: string): string;
/**
 * Remove forbidden chars from the provided filename (replace them by '_')
 *
 * Versions: 29.07.2024
 * @param {string} filename is the filename to remove the forbidden chars of
 * @returns {string} is the cleaned extension text
 */
export declare function cleanFilename(filename: string): string;
//# sourceMappingURL=exerma_files.d.ts.map