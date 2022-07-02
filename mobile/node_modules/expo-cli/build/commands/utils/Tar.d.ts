/**
 * Download a tar.gz file and extract it to a folder.
 *
 * @param url remote URL to download.
 * @param destination destination folder to extract the tar to.
 */
export declare function downloadAndDecompressAsync(url: string, destination: string): Promise<string>;
