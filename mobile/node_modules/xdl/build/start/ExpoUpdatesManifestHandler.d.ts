import { ExpoUpdatesManifest } from '@expo/config';
import express from 'express';
import http from 'http';
export declare function getManifestResponseAsync({ projectRoot, platform, host, acceptSignature, }: {
    projectRoot: string;
    platform: 'android' | 'ios';
    host?: string;
    acceptSignature: boolean;
}): Promise<{
    body: ExpoUpdatesManifest;
    headers: Map<string, number | string | readonly string[]>;
}>;
export declare function getManifestHandler(projectRoot: string): (req: express.Request | http.IncomingMessage, res: express.Response | http.ServerResponse, next: (err?: Error | undefined) => void) => Promise<void>;
