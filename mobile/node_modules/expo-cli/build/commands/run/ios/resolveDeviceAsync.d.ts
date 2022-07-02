import { SimControl } from 'xdl';
export declare function resolveDeviceAsync(device?: string | boolean, { osType }?: {
    osType?: string;
}): Promise<SimControl.SimulatorDevice | SimControl.XCTraceDevice>;
