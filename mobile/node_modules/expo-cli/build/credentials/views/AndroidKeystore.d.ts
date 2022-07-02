import { Context, IView } from '../context';
import { Keystore } from '../credentials';
interface UpdateKeystoreOptions {
    bestEffortKeystoreGeneration?: boolean;
    skipKeystoreValidation: boolean;
}
declare class UpdateKeystore implements IView {
    private experienceName;
    private options;
    constructor(experienceName: string, options: UpdateKeystoreOptions);
    open(ctx: Context): Promise<IView | null>;
    provideOrGenerate(ctx: Context): Promise<Keystore | null>;
    displayWarning(): Promise<void>;
}
declare class RemoveKeystore implements IView {
    private experienceName;
    constructor(experienceName: string);
    open(ctx: Context): Promise<IView | null>;
    displayWarning(): Promise<void>;
}
interface DownloadKeystoreOptions {
    quiet?: boolean;
    displayCredentials?: boolean;
    outputPath?: string;
}
declare class DownloadKeystore implements IView {
    private experienceName;
    private options?;
    constructor(experienceName: string, options?: DownloadKeystoreOptions | undefined);
    open(ctx: Context): Promise<IView | null>;
}
declare function getKeystoreFromParams(options: {
    keystorePath?: string;
    keystoreAlias?: string;
}): Promise<Keystore | null>;
declare function useKeystore(ctx: Context, { experienceName, keystore, skipKeystoreValidation, }: {
    experienceName: string;
    keystore: Keystore;
    skipKeystoreValidation: boolean;
}): Promise<void>;
export { UpdateKeystore, RemoveKeystore, DownloadKeystore, useKeystore, getKeystoreFromParams };
