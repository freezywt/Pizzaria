/**
 * @param {string} projectDirname
 * @param {string} basename
 * @returns {} { width: number, height: number } image dimensions or null
 */
declare function getImageDimensionsAsync(projectDirname: string, basename: string): Promise<{
    width: number;
    height: number;
} | null>;
declare function resizeImageAsync(iconSizePx: number, iconFilename: string, destinationIconPath: string): Promise<import("@expo/spawn-async").SpawnResult>;
declare function setResizeImageFunction(fn: (iconSizePx: number, iconFilename: string, destinationIconPath: string) => Promise<any>): void;
declare function setGetImageDimensionsFunction(fn: (dirname: string, filename: string) => Promise<{
    width: number;
    height: number;
} | null>): void;
export { resizeImageAsync, setResizeImageFunction, setGetImageDimensionsFunction, getImageDimensionsAsync, };
