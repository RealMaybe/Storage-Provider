import {
    isString,
    // isNumber,
    // isBoolean,
    // isObject,
    // isArray,
    // isObjectAndNotArray
} from "../type/checkType";

export function processingData(
    params: string | null
): any {
    return isString(params) ? params : null;
};