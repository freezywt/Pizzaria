/// <reference types="node" />
import express from 'express';
import http from 'http';
export declare const LoadingEndpoint = "/_expo/loading";
export declare const DeepLinkEndpoint = "/_expo/link";
declare type OnDeepLinkListener = (projectRoot: string, isDevClient: boolean, platform: string | null) => Promise<void>;
export declare function setOnDeepLink(listener: OnDeepLinkListener): void;
export declare function noCacheMiddleware(res: express.Response | http.ServerResponse): express.Response | http.ServerResponse;
export declare function getLoadingPageHandler(projectRoot: string): (req: express.Request | http.IncomingMessage, res: express.Response | http.ServerResponse, next: (err?: Error | undefined) => void) => Promise<void>;
export {};
