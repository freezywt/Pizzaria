export interface NgrokOptions {
    authtoken?: string;
    port?: string | number | null;
    host?: string;
    httpauth?: string;
    region?: string;
    configPath?: string;
    proto?: 'http' | 'tcp' | 'tls';
    addr?: string;
    inspect?: boolean;
    auth?: string;
    host_header?: string;
    bind_tls?: true | false | 'both';
    subdomain?: string;
    hostname?: string;
    crt?: string;
    key?: string;
    client_cas?: string;
    remote_addr?: string;
}
export declare function resolveNgrokAsync(projectRoot: string, { shouldPrompt, autoInstall, }?: {
    shouldPrompt?: boolean;
    autoInstall?: boolean;
}): Promise<any>;
