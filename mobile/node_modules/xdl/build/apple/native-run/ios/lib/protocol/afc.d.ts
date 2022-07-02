/// <reference types="node" />
import type * as net from 'net';
import type { ProtocolReaderCallback, ProtocolWriter } from './protocol';
import { ProtocolClient, ProtocolReader } from './protocol';
export declare const AFC_MAGIC = "CFA6LPAA";
export declare const AFC_HEADER_SIZE = 40;
export interface AFCHeader {
    magic: typeof AFC_MAGIC;
    totalLength: number;
    headerLength: number;
    requestId: number;
    operation: AFC_OPS;
}
export interface AFCMessage {
    operation: AFC_OPS;
    data?: any;
    payload?: any;
}
export interface AFCResponse {
    operation: AFC_OPS;
    id: number;
    data: Buffer;
}
export interface AFCStatusResponse {
    operation: AFC_OPS.STATUS;
    id: number;
    data: number;
}
/**
 * AFC Operations
 */
export declare enum AFC_OPS {
    /**
     * Invalid
     */
    INVALID = 0,
    /**
     * Status
     */
    STATUS = 1,
    /**
     * Data
     */
    DATA = 2,
    /**
     * ReadDir
     */
    READ_DIR = 3,
    /**
     * ReadFile
     */
    READ_FILE = 4,
    /**
     * WriteFile
     */
    WRITE_FILE = 5,
    /**
     * WritePart
     */
    WRITE_PART = 6,
    /**
     * TruncateFile
     */
    TRUNCATE = 7,
    /**
     * RemovePath
     */
    REMOVE_PATH = 8,
    /**
     * MakeDir
     */
    MAKE_DIR = 9,
    /**
     * GetFileInfo
     */
    GET_FILE_INFO = 10,
    /**
     * GetDeviceInfo
     */
    GET_DEVINFO = 11,
    /**
     * WriteFileAtomic (tmp file+rename)
     */
    WRITE_FILE_ATOM = 12,
    /**
     * FileRefOpen
     */
    FILE_OPEN = 13,
    /**
     * FileRefOpenResult
     */
    FILE_OPEN_RES = 14,
    /**
     * FileRefRead
     */
    FILE_READ = 15,
    /**
     * FileRefWrite
     */
    FILE_WRITE = 16,
    /**
     * FileRefSeek
     */
    FILE_SEEK = 17,
    /**
     * FileRefTell
     */
    FILE_TELL = 18,
    /**
     * FileRefTellResult
     */
    FILE_TELL_RES = 19,
    /**
     * FileRefClose
     */
    FILE_CLOSE = 20,
    /**
     * FileRefSetFileSize (ftruncate)
     */
    FILE_SET_SIZE = 21,
    /**
     * GetConnectionInfo
     */
    GET_CON_INFO = 22,
    /**
     * SetConnectionOptions
     */
    SET_CON_OPTIONS = 23,
    /**
     * RenamePath
     */
    RENAME_PATH = 24,
    /**
     * SetFSBlockSize (0x800000)
     */
    SET_FS_BS = 25,
    /**
     * SetSocketBlockSize (0x800000)
     */
    SET_SOCKET_BS = 26,
    /**
     * FileRefLock
     */
    FILE_LOCK = 27,
    /**
     * MakeLink
     */
    MAKE_LINK = 28,
    /**
     * GetFileHash
     */
    GET_FILE_HASH = 29,
    /**
     * SetModTime
     */
    SET_FILE_MOD_TIME = 30,
    /**
     * GetFileHashWithRange
     */
    GET_FILE_HASH_RANGE = 31,
    /**
     * FileRefSetImmutableHint
     */
    FILE_SET_IMMUTABLE_HINT = 32,
    /**
     * GetSizeOfPathContents
     */
    GET_SIZE_OF_PATH_CONTENTS = 33,
    /**
     * RemovePathAndContents
     */
    REMOVE_PATH_AND_CONTENTS = 34,
    /**
     * DirectoryEnumeratorRefOpen
     */
    DIR_OPEN = 35,
    /**
     * DirectoryEnumeratorRefOpenResult
     */
    DIR_OPEN_RESULT = 36,
    /**
     * DirectoryEnumeratorRefRead
     */
    DIR_READ = 37,
    /**
     * DirectoryEnumeratorRefClose
     */
    DIR_CLOSE = 38,
    /**
     * FileRefReadWithOffset
     */
    FILE_READ_OFFSET = 39,
    /**
     * FileRefWriteWithOffset
     */
    FILE_WRITE_OFFSET = 40
}
/**
 * Error Codes
 */
export declare enum AFC_STATUS {
    SUCCESS = 0,
    UNKNOWN_ERROR = 1,
    OP_HEADER_INVALID = 2,
    NO_RESOURCES = 3,
    READ_ERROR = 4,
    WRITE_ERROR = 5,
    UNKNOWN_PACKET_TYPE = 6,
    INVALID_ARG = 7,
    OBJECT_NOT_FOUND = 8,
    OBJECT_IS_DIR = 9,
    PERM_DENIED = 10,
    SERVICE_NOT_CONNECTED = 11,
    OP_TIMEOUT = 12,
    TOO_MUCH_DATA = 13,
    END_OF_DATA = 14,
    OP_NOT_SUPPORTED = 15,
    OBJECT_EXISTS = 16,
    OBJECT_BUSY = 17,
    NO_SPACE_LEFT = 18,
    OP_WOULD_BLOCK = 19,
    IO_ERROR = 20,
    OP_INTERRUPTED = 21,
    OP_IN_PROGRESS = 22,
    INTERNAL_ERROR = 23,
    MUX_ERROR = 30,
    NO_MEM = 31,
    NOT_ENOUGH_DATA = 32,
    DIR_NOT_EMPTY = 33,
    FORCE_SIGNED_TYPE = -1
}
export declare enum AFC_FILE_OPEN_FLAGS {
    /**
     * r (O_RDONLY)
     */
    RDONLY = 1,
    /**
     * r+ (O_RDWR | O_CREAT)
     */
    RW = 2,
    /**
     * w (O_WRONLY | O_CREAT | O_TRUNC)
     */
    WRONLY = 3,
    /**
     * w+ (O_RDWR | O_CREAT  | O_TRUNC)
     */
    WR = 4,
    /**
     * a (O_WRONLY | O_APPEND | O_CREAT)
     */
    APPEND = 5,
    /**
     * a+ (O_RDWR | O_APPEND | O_CREAT)
     */
    RDAPPEND = 6
}
export declare class AFCError extends Error {
    status: AFC_STATUS;
    constructor(msg: string, status: AFC_STATUS);
}
export declare class AFCProtocolClient extends ProtocolClient {
    private requestId;
    private requestCallbacks;
    constructor(socket: net.Socket);
    sendMessage(msg: AFCMessage): Promise<AFCResponse>;
}
export declare class AFCProtocolReader extends ProtocolReader {
    private header;
    constructor(callback: ProtocolReaderCallback);
    parseHeader(data: Buffer): number;
    parseBody(data: Buffer): AFCResponse | AFCStatusResponse;
}
export declare class AFCProtocolWriter implements ProtocolWriter {
    write(socket: net.Socket, msg: AFCMessage & {
        requestId: number;
    }): void;
}
