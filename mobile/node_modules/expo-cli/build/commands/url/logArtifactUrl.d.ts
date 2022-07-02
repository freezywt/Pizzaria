declare type ArtifactUrlOptions = {
    publicUrl?: string;
};
export declare const logArtifactUrl: (platform: 'ios' | 'android') => (projectRoot: string, options: ArtifactUrlOptions) => Promise<void>;
export {};
