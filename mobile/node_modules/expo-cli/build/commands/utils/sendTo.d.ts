export declare function askForSendToAsync(): Promise<string>;
export declare function getRecipient(sendTo?: string | boolean): Promise<string>;
export declare function sendUrlAsync(url: string, recipient: string): Promise<any>;
