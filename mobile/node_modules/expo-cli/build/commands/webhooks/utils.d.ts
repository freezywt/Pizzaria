import { ApiV2 } from 'xdl';
export declare type WebhookEvent = 'build';
export declare function validateSecret({ secret }: {
    secret?: string;
}): string | null;
export declare function generateSecret(): string;
export declare function setupAsync(projectRoot: string): Promise<{
    experienceName: string;
    project: any;
    client: ApiV2;
}>;
