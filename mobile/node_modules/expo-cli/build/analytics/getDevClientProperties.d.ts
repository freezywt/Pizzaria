import { ExpoConfig } from '@expo/config';
import { JSONValue } from '@expo/json-file';
export default function getDevClientProperties(projectRoot: string, exp: ExpoConfig): {
    account_name: string;
    dev_client_version: JSONValue | undefined;
    project_type: "managed" | "generic";
    uptime_ms: number;
};
