import chalk from 'chalk';
import type { Ora } from 'ora';
import type ProgressBar from 'progress';
import terminalLink from 'terminal-link';
export default class Log {
    static readonly chalk: chalk.Chalk & chalk.ChalkFunction & {
        supportsColor: false | chalk.ColorSupport;
        Level: chalk.Level;
        Color: ("black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright") | ("bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright");
        ForegroundColor: "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
        BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
        Modifiers: "bold" | "strikethrough" | "italic" | "underline" | "reset" | "hidden" | "visible" | "dim" | "inverse";
        stderr: chalk.Chalk & {
            supportsColor: false | chalk.ColorSupport;
        };
    };
    static readonly terminalLink: {
        (text: string, url: string, options?: terminalLink.Options | undefined): string;
        readonly isSupported: boolean;
        readonly stderr: {
            (text: string, url: string, options?: terminalLink.Options | undefined): string;
            readonly isSupported: boolean;
        };
    };
    static readonly isDebug: boolean;
    static readonly isProfiling: boolean;
    static log(...args: any[]): void;
    static nested(message: any): void;
    static time: (label?: string | undefined) => void;
    static timeEnd: (label?: string | undefined) => void;
    static newLine(): void;
    static addNewLineIfNone(): void;
    static printNewLineBeforeNextLog(): void;
    static setBundleProgressBar(bar: ProgressBar | null): void;
    static setSpinner(oraSpinner: (Ora & {
        __modified?: boolean;
    }) | null): void;
    static getSpinner(): Ora | null;
    static getProgress(): ProgressBar | null;
    static error(...args: any[]): void;
    static nestedError(message: string): void;
    static warn(...args: any[]): void;
    static debug(...args: any[]): void;
    static info(...args: any[]): void;
    static nestedWarn(message: string): void;
    static gray(...args: any[]): void;
    static clear(): void;
    private static _bundleProgressBar;
    private static _oraSpinner;
    private static _printNewLineBeforeNextLog;
    private static _isLastLineNewLine;
    private static _updateIsLastLineNewLine;
    private static _maybePrintNewLine;
    private static consoleDebug;
    private static consoleInfo;
    private static consoleLog;
    private static consoleWarn;
    private static consoleError;
    private static respectProgressBars;
    private static getPrefix;
    private static withPrefixAndTextColor;
    private static withPrefix;
}
