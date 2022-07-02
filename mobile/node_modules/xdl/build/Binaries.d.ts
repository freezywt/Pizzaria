export declare const OSX_SOURCE_PATH: string;
export declare function getBinariesPath(): string;
export declare function addToPathAsync(name: string): Promise<void>;
export declare function writePathToUserSettingsAsync(): Promise<void>;
export declare function isXcodeInstalled(): boolean;
