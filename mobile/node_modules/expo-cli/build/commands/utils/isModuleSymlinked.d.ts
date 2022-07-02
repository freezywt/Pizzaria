/**
 * Given a node module name, and a project path, this method will:
 *
 * 1. Resolve the module path.
 * 2. Find the module root folder.
 * 3. Return true if the module root folder is in a folder named `node_modules`
 *
 * @param projectRoot
 * @param moduleId
 *
 * @example
 * isModuleSymlinked({
 *   projectRoot: './expo/apps/native-component-list',
 *   moduleId: 'react-native'
 * })
 */
export declare function isModuleSymlinked({ projectRoot, moduleId, isSilent, }: {
    projectRoot: string;
    moduleId: string;
    isSilent?: boolean;
}): boolean;
