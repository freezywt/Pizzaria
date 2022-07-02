import { JSONObject } from '@expo/json-file';
import { CellValue } from 'cli-table3';
export declare function printTableJsonArray(headers: string[], jsonArray: {
    [key: string]: CellValue;
}[], colWidths: number[]): string;
export declare function printTableJson(json: JSONObject, header1?: string, header2?: string): string;
