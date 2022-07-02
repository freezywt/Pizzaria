export default function validateKeystoreAsync({ keystore: keystoreBase64, keystorePassword, keyAlias, }: {
    keystore: string;
    keystorePassword: string;
    keyAlias: string;
}): Promise<void>;
