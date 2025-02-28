import {
    isString
} from "../type/checkType";

export function processingData(params: any): any {
    return isString(params) ? params : null;
};