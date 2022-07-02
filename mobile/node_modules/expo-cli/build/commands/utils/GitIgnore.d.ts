declare type MergeResults = {
    contents: string;
    didClear: boolean;
    didMerge: boolean;
};
/**
 * Merge two gitignore files together and add a generated header.
 *
 * @param targetGitIgnorePath
 * @param sourceGitIgnorePath
 */
export declare function mergeGitIgnorePaths(targetGitIgnorePath: string, sourceGitIgnorePath: string): null | MergeResults;
export declare const generatedFooterComment = "# @end expo-cli";
/**
 * Removes the generated section from a gitignore, returns null when nothing can be removed.
 * This sways heavily towards not removing lines unless it's certain that modifications were not made to the gitignore manually.
 *
 * @param gitIgnore
 */
export declare function removeGeneratedGitIgnoreContents(gitIgnore: string): string | null;
/**
 * Merge the contents of two gitignores together and add a generated header.
 *
 * @param targetGitIgnore contents of the existing gitignore
 * @param sourceGitIgnore contents of the extra gitignore
 */
export declare function mergeGitIgnoreContents(targetGitIgnore: string, sourceGitIgnore: string): MergeResults;
export declare function createGeneratedHeaderComment(gitIgnore: string): string;
/**
 * Normalize the contents of a gitignore to ensure that minor changes like new lines or sort order don't cause a regeneration.
 */
export declare function getSanitizedGitIgnoreLines(gitIgnore: string): string[];
export declare function createGitIgnoreHash(gitIgnore: string): string;
export {};
