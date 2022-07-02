export default class BuildError extends Error {
    message: string;
    readonly name = "BuildError";
    constructor(message: string);
}
