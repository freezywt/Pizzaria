/**
 * Find the development team and provisioning profile that's currently in use by the Xcode project.
 *
 * @param projectRoot
 * @returns
 */
export declare function getCodeSigningInfoForPbxproj(projectRoot: string): Record<string, {
    developmentTeams: string[];
    provisioningProfiles: string[];
}>;
export declare function ensureDeviceIsCodeSignedForDeploymentAsync(projectRoot: string): Promise<string | null>;
