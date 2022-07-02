import Minipass from 'minipass';
import { ReadEntry } from 'tar';
declare class Transformer extends Minipass {
    private settings;
    data: string;
    constructor(settings: {
        name: string;
        extension: string;
    });
    write(data: string): boolean;
    getNormalizedName(): string;
    end(): this;
}
export declare function createEntryResolver(name: string): (entry: ReadEntry) => void;
export declare function createFileTransform(name: string): (entry: ReadEntry) => Transformer | undefined;
export {};
