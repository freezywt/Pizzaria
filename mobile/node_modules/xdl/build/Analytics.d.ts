export declare class AnalyticsClient {
    private userTraits?;
    private rudderstackClient?;
    private _userId?;
    private _version?;
    get userId(): string | undefined;
    get version(): string | undefined;
    flush(): Promise<void>;
    initializeClient(rudderstackWriteKey: string, rudderstackDataPlaneURL: string, packageVersion: string): void;
    identifyUser(userId: string, traits: {
        [key: string]: any;
    }): void;
    logEvent(name: string, properties?: any): void;
    private getContext;
}
declare const defaultClient: AnalyticsClient;
export default defaultClient;
