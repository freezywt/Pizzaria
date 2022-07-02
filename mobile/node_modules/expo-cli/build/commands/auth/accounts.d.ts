import { User } from 'xdl';
export declare type CommandOptions = {
    username?: string;
    password?: string;
    otp?: string;
    parent?: {
        nonInteractive: boolean;
    };
};
export declare enum UserSecondFactorDeviceMethod {
    AUTHENTICATOR = "authenticator",
    SMS = "sms"
}
export declare type SecondFactorDevice = {
    id: string;
    method: UserSecondFactorDeviceMethod;
    sms_phone_number: string | null;
    is_primary: boolean;
};
export declare function loginOrRegisterAsync(): Promise<User>;
export declare function loginOrRegisterIfLoggedOutAsync(): Promise<User>;
export declare function login(options: CommandOptions): Promise<User>;
/**
 * Handle the special case error indicating that a second-factor is required for
 * authentication.
 *
 * There are three cases we need to handle:
 * 1. User's primary second-factor device was SMS, OTP was automatically sent by the server to that
 *    device already. In this case we should just prompt for the SMS OTP (or backup code), which the
 *    user should be receiving shortly. We should give the user a way to cancel and the prompt and move
 *    to case 3 below.
 * 2. User's primary second-factor device is authenticator. In this case we should prompt for authenticator
 *    OTP (or backup code) and also give the user a way to cancel and move to case 3 below.
 * 3. User doesn't have a primary device or doesn't have access to their primary device. In this case
 *    we should show a picker of the SMS devices that they can have an OTP code sent to, and when
 *    the user picks one we show a prompt() for the sent OTP.
 */
export declare function _retryUsernamePasswordAuthWithOTPAsync(username: string, password: string, metadata: {
    secondFactorDevices?: SecondFactorDevice[];
    smsAutomaticallySent?: boolean;
}): Promise<User>;
export declare const REGISTRATION_URL = "https://expo.dev/signup";
export declare function openRegistrationInBrowser(): Promise<void>;
