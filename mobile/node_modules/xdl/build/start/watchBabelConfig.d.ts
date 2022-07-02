/**
 * Get the babel configuration file for the project.
 */
export declare function getProjectBabelConfigFile(projectRoot: string): string | undefined;
export declare function watchBabelConfigForProject(projectRoot: string): string | void;
/**
 * Watch the babel configuration file and warn to reload the CLI if it changes.
 */
export declare function watchBabelConfig(projectRoot: string, configPath: string): void;
