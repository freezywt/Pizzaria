import { ErrorCode } from './internal';
export default class XDLError extends Error {
    readonly name = "XDLError";
    code: string;
    isXDLError: true;
    constructor(code: ErrorCode, message: string);
}
