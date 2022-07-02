import editors from 'env-editor';
export declare function guessEditor(): editors.Editor;
export declare function openInEditorAsync(path: string, options?: {
    editor?: string;
}): Promise<boolean>;
