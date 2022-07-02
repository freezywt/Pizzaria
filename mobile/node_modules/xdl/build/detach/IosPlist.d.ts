/**
 *  @param plistName base filename of property list. if no extension, assumes .plist
 */
declare function modifyAsync(plistPath: string, plistName: string, transform: (config: any) => any): Promise<any>;
declare function createBlankAsync(plistPath: string, plistName: string): Promise<void>;
export { modifyAsync, createBlankAsync };
