import { type RealClassConfigType } from "../tsType/classConfigType"; // 实际使用的类配置类型
import {
    isArray,
    isBoolean,
    isNumber,
    isObjectAndNotArray,
    isString,
} from "../type/checkType";


/* ========== */


/**
 * 处理数据的函数，根据传入的参数类型，返回相应的数据
 * 是 getValue 和 setValue 的辅助函数
 * @function processingData
 * @param { any } params 需要处理的数据
 * @param { boolean } handle 处理数据的模式
 * - true: 数据转换为字符串
 * - false: 字符串转换为数据
 * @returns 
 */
export function processingData(
    classConfig: RealClassConfigType<boolean>,
    params: any,
    handle: boolean
): any {
    // const { storage, original } = classConfig;
    let result = null;

    if (isArray(params)) result = params;
    if (isString(params)) result = params;
    if (isBoolean(params)) result = params;
    if (isObjectAndNotArray(params)) result = params;
    if (isNumber(params)) result = params;

    return result
};