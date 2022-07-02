import G from 'glob';
export declare function everyMatchAsync(pattern: string, options: G.IOptions): Promise<string[]>;
export declare function anyMatchAsync(pattern: string, options: G.IOptions): Promise<string[]>;
export declare function wrapGlobWithTimeout(query: () => Promise<string[]>, duration: number): Promise<string[] | false>;
