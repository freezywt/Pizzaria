export declare class Semaphore {
    queue: ((v: boolean) => void)[];
    available: number;
    acquire(): Promise<boolean>;
    release(): void;
}
