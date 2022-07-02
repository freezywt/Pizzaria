/**
 * Windows only. On any other platform (including WSL on Windows) it's no-op.
 *
 * Checks whether the script is executed from `cmd.exe` and if positive suggests using other terminals.
 */
export declare function warnUponCmdExe(): Promise<void>;
