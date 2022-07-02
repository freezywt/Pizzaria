export declare const EXPO_NO_KEYCHAIN: boolean;
declare type Credentials = {
    serviceName: string;
    username: string;
    password: string;
};
export declare function deletePasswordAsync({ username, serviceName, }: Pick<Credentials, 'username' | 'serviceName'>): Promise<boolean>;
export declare function getPasswordAsync({ username, serviceName, }: Pick<Credentials, 'serviceName' | 'username'>): Promise<string | null>;
export declare function setPasswordAsync({ serviceName, username, password, }: Credentials): Promise<boolean>;
export {};
