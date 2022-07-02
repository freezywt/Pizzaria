interface AppleTeam {
    teamId: string;
    teamName: string;
}
declare function readAppleTeam(dataBase64: string): AppleTeam;
declare function readProfileName(dataBase64: string): string;
export { readAppleTeam, readProfileName };
