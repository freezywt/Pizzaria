import { JSONObject } from '@expo/json-file';
import { ProjectUtils } from '../internal';
declare type BuildEventType = 'METRO_INITIALIZE_STARTED' | 'BUILD_STARTED' | 'BUILD_PROGRESS' | 'BUILD_FAILED' | 'BUILD_DONE';
declare type MetroLogRecord = {
    tag: 'metro';
    id: string;
    shouldHide: boolean;
    msg: ReportableEvent | string;
    level: number;
    _metroEventType?: BuildEventType;
};
declare type ExpoLogRecord = {
    tag: 'expo';
    id: string;
    shouldHide: boolean;
    msg: any;
    level: number;
};
declare type DeviceLogRecord = {
    tag: 'device';
    id: string;
    shouldHide: boolean;
    msg: any;
    level: number;
    deviceId: string;
    deviceName: string;
};
export declare type LogRecord = (MetroLogRecord | ExpoLogRecord | DeviceLogRecord) & ProjectUtils.LogFields;
export declare type LogUpdater = (logState: LogRecord[]) => LogRecord[];
declare type ErrorObject = {
    name?: string;
    stack?: string;
    message?: string;
    code?: string;
} & JSONObject;
declare type MetroError = ({
    originModulePath: string;
    message: string;
    errors: {
        description: string;
        filename: string;
        lineNumber: number;
    }[];
} & ErrorObject) | ({
    type: 'TransformError';
    snippet: string;
    lineNumber: number;
    column: number;
    filename: string;
    errors: {
        description: string;
        filename: string;
        lineNumber: number;
    }[];
} & ErrorObject) | ErrorObject;
declare type GlobalCacheDisabledReason = 'too_many_errors' | 'too_many_misses';
declare type BundleDetails = {
    entryFile: string;
    platform: string;
    dev: boolean;
    minify: boolean;
    bundleType: string;
};
declare type ReportableEvent = {
    port: number | undefined;
    projectRoots: readonly string[];
    type: 'initialize_started';
} | {
    type: 'initialize_done';
} | {
    type: 'client_log';
    data: any;
} | {
    type: 'initialize_failed';
    port: number;
    error: MetroError;
} | {
    buildID: string;
    type: 'bundle_build_done';
} | {
    buildID: string;
    type: 'bundle_build_failed';
} | {
    buildID: string;
    bundleDetails: BundleDetails;
    type: 'bundle_build_started';
} | {
    error: MetroError;
    type: 'bundling_error';
} | {
    warning: string;
    type: 'bundling_warning';
} | {
    type: 'dep_graph_loading';
} | {
    type: 'dep_graph_loaded';
} | {
    buildID: string;
    type: 'bundle_transform_progressed';
    transformedFileCount: number;
    totalFileCount: number;
    percentage?: number;
} | {
    type: 'global_cache_error';
    error: MetroError;
} | {
    type: 'global_cache_disabled';
    reason: GlobalCacheDisabledReason;
} | {
    type: 'transform_cache_reset';
} | {
    type: 'worker_stdout_chunk';
    chunk: string;
} | {
    type: 'worker_stderr_chunk';
    chunk: string;
} | {
    type: 'transformer_load_started';
} | {
    type: 'transformer_load_done';
} | {
    type: 'hmr_client_error';
    error: MetroError;
};
declare type StartBuildBundleCallback = (props: {
    chunk: LogRecord;
    bundleDetails: BundleDetails | null;
}) => void;
declare type ProgressBuildBundleCallback = (props: {
    progress: number;
    start: Date | null;
    chunk: any;
    bundleDetails: BundleDetails | null;
}) => void;
declare type FinishBuildBundleCallback = (props: {
    error: string | null;
    start: Date;
    end: Date;
    chunk: MetroLogRecord;
    bundleDetails: BundleDetails | null;
}) => void;
export default class PackagerLogsStream {
    _projectRoot: string;
    _getCurrentOpenProjectId: () => any;
    _updateLogs: (updater: LogUpdater) => void;
    _logsToAdd: LogRecord[];
    _bundleBuildChunkID: string | null;
    _onStartBuildBundle?: StartBuildBundleCallback;
    _onProgressBuildBundle?: ProgressBuildBundleCallback;
    _onFinishBuildBundle?: FinishBuildBundleCallback;
    _bundleBuildStart: Date | null;
    _getSnippetForError?: (error: MetroError) => string | null;
    constructor({ projectRoot, getCurrentOpenProjectId, updateLogs, onStartBuildBundle, onProgressBuildBundle, onFinishBuildBundle, getSnippetForError, }: {
        projectRoot: string;
        getCurrentOpenProjectId?: () => any;
        updateLogs: (updater: LogUpdater) => void;
        onStartBuildBundle?: StartBuildBundleCallback;
        onProgressBuildBundle?: ProgressBuildBundleCallback;
        onFinishBuildBundle?: FinishBuildBundleCallback;
        getSnippetForError?: (error: MetroError) => string | null;
    });
    projectId?: number;
    _attachLoggerStream(): void;
    _handleChunk(chunk: LogRecord): void;
    _handleMetroEvent(originalChunk: MetroLogRecord): void;
    bundleDetailsCache: Record<string, BundleDetails>;
    _handleBundleTransformEvent: (chunk: MetroLogRecord) => void;
    static getPlatformTagForBuildDetails(bundleDetails?: BundleDetails | null): string;
    private _handleNewBundleTransformStarted;
    private _handleUpdateBundleTransformProgress;
    _formatModuleResolutionError(error: MetroError): string | null;
    _formatBundlingError(error: MetroError): string | null;
    _formatWorkerChunk(origin: 'stdout' | 'stderr', chunk: string): string;
    _enqueueAppendLogChunk(chunk: LogRecord): void;
    _enqueueFlushLogsToAdd: () => void;
    _maybeParseMsgJSON(chunk: LogRecord): LogRecord;
    _cleanUpNodeErrors: (chunk: LogRecord) => LogRecord;
}
export {};
