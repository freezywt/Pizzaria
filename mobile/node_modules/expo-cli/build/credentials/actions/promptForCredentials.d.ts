export declare type Question = {
    question: string;
    type: 'file' | 'string' | 'password';
    base64Encode?: boolean;
};
declare type Results = {
    [key: string]: string | undefined;
};
export declare type CredentialSchema<T> = {
    id: string;
    canReuse?: boolean;
    dependsOn?: string;
    name: string;
    required: string[];
    questions: {
        [key: string]: Question;
    };
    deprecated?: boolean;
    migrationDocs?: string;
    provideMethodQuestion?: {
        question?: string;
        expoGenerated?: string;
        userProvided?: string;
    };
};
export declare function askForUserProvided<T extends Results>(schema: CredentialSchema<T>): Promise<T | null>;
export declare function getCredentialsFromUser<T extends Results>(credentialType: CredentialSchema<T>): Promise<T | null>;
export {};
