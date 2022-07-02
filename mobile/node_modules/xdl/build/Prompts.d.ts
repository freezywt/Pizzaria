declare type InteractionOptions = {
    pause: boolean;
    canEscape?: boolean;
};
declare type InteractionCallback = (options: InteractionOptions) => void;
/**
 * Used to pause/resume interaction observers while prompting (made for TerminalUI).
 *
 * @param callback
 */
export declare function addInteractionListener(callback: InteractionCallback): void;
export declare function removeInteractionListener(callback: InteractionCallback): void;
export declare function pauseInteractions(options?: Omit<InteractionOptions, 'pause'>): void;
export declare function resumeInteractions(options?: Omit<InteractionOptions, 'pause'>): void;
export declare function confirmAsync(options: {
    initial?: boolean;
    message: string;
}): Promise<boolean>;
export {};
