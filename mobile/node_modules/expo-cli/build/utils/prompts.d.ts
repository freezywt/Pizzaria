import prompts, { Options, PromptObject, PromptType } from 'prompts';
export declare type Question<V extends string = string> = PromptObject<V> & {
    optionsPerPage?: number;
};
export { PromptType };
declare type PromptOptions = {
    nonInteractiveHelp?: string;
} & Options;
declare function prompt(questions: Question | Question[], { nonInteractiveHelp, ...options }?: PromptOptions): Promise<prompts.Answers<string>>;
declare namespace prompt {
    var separator: (title: string) => {
        title: string;
        disabled: boolean;
        value: undefined;
    };
}
export default prompt;
export declare type NamelessQuestion = Omit<Question<'value'>, 'name' | 'type'>;
/**
 * Create an auto complete list that can be searched and cancelled.
 *
 * @param questions
 * @param options
 */
export declare function autoCompleteAsync(questions: NamelessQuestion | NamelessQuestion[], options?: PromptOptions): Promise<string>;
/**
 * Create a selection list that can be cancelled.
 *
 * @param questions
 * @param options
 */
export declare function selectAsync(questions: NamelessQuestion, options?: PromptOptions): Promise<any>;
/**
 * Create a standard yes/no confirmation that can be cancelled.
 *
 * @param questions
 * @param options
 */
export declare function confirmAsync(questions: NamelessQuestion, options?: PromptOptions): Promise<boolean>;
/**
 * Create a more dynamic yes/no confirmation that can be cancelled.
 *
 * @param questions
 * @param options
 */
export declare function toggleConfirmAsync(questions: NamelessQuestion, options?: PromptOptions): Promise<boolean>;
/**
 * Prompt the user for an email address.
 *
 * @param questions
 * @param options
 */
export declare function promptEmailAsync(questions: NamelessQuestion, options?: PromptOptions): Promise<string>;
