/**
 * When linking isn't available, fallback to displaying the URL beside the
 * text in parentheses.
 *
 * @example [Expo](https://expo.dev)
 * @example Expo (https://expo.dev)
 *
 * @param value
 * @param url
 */
export declare function fallbackToTextAndUrl(text: string, url: string): string;
/**
 * When linking isn't available, fallback to just displaying the URL.
 *
 * @example [value](https://expo.dev)
 * @example https://expo.dev
 *
 * @param text
 * @param url
 */
export declare function fallbackToUrl(text: string, url: string): string;
/**
 * When linking isn't available, format the learn more link better.
 *
 * @example [Learn more](https://expo.dev)
 * @example Learn more: https://expo.dev
 * @param url
 */
export declare function learnMore(url: string): string;
export declare function linkedText(text: string, url: string): string;
export declare function transporterAppLink(): string;
