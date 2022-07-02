interface ApiConfig {
    scheme: string;
    host: string;
    port: number | null;
}
interface XDLConfig {
    api: ApiConfig;
    developerTool: string;
}
declare const config: XDLConfig;
export default config;
