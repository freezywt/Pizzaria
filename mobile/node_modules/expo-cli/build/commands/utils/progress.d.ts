import type { Progress } from 'got';
declare type ProgressTracker = (progress: Progress) => void;
declare function createProgressTracker(_total?: number): ProgressTracker;
export { createProgressTracker };
