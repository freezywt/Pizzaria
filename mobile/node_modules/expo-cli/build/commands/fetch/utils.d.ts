export declare type Options = {
    parent?: {
        nonInteractive: boolean;
    };
};
export declare function assertSlug(slug: any): asserts slug;
export declare function maybeRenameExistingFileAsync(projectRoot: string, filename: string): Promise<void>;
