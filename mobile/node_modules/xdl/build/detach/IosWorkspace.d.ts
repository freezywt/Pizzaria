/**
 *  paths returned:
 *    iosProjectDirectory - root directory of an (uncompiled) xcworkspace and obj-c source tree
 *    projectName - xcworkspace project name normalized from context.config
 *    supportingDirectory - location of Info.plist, xib files, etc. during configuration.
 *      for an unbuilt app this is underneath iosProjectDirectory. for a compiled app it's just
 *      a path to the flat xcarchive.
 *    intermediatesDirectory - temporary spot to write whatever files are needed during the
 *      detach/build process but can be discarded afterward.
 */
declare function getPaths(context: any): {
    projectRootDirectory: any;
    intermediatesDirectory: string;
    iosProjectDirectory: any;
    projectName: any;
    supportingDirectory: any;
};
export { getPaths };
