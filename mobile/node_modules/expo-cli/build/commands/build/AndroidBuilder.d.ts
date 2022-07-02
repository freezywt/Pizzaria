import BaseBuilder from './BaseBuilder';
import { Platform } from './constants';
export default class AndroidBuilder extends BaseBuilder {
    run(): Promise<void>;
    checkProjectConfig(): Promise<void>;
    platform(): Platform;
    collectAndValidateCredentials(): Promise<void>;
}
