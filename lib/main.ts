import { StorageProvider } from "./Storage";
import { isCircular } from "./checker/isCircular";
import { haveSameKeys } from "./validate/objectHaveSameKeys";
import {
    isNotANumber,
    isNull,
    isUndefined,
    isInfinity,
    isArray,
    isBigInt,
    isBoolean,
    isFunction,
    isNumber,
    isObject,
    isObjectAndNotArray,
    isString,
    isSymbol,
    checkType,
    isInvalid,
    isEffective
} from "./type/checkType";


/* ========== */


// 简单实例化 StorageProvider

/**
 * local 存储实例
 * - 只进行了最简单的配置，可能无法满足实际需求，
 * - 如果有需要，请自行配置
 */
const $localProvider = new StorageProvider("local");

/**
 * session 存储实例
 * - 只进行了最简单的配置，可能无法满足实际需求，
 * - 如果有需要，请自行配置
 */
const $sessionProvider = new StorageProvider("session");


/* ========== */


// 导出
export {
    StorageProvider as default, // StorageProvider 类
    $localProvider, // local 存储实例
    $sessionProvider, // session 存储实例
    isCircular, // 检查对象是否为循环引用
    haveSameKeys as objectHaveSameKeys, // 检查两个对象是否拥有相同的键
    checkType, // 类型判断

    // 类型判断辅助函数
    isNotANumber,
    isNull,
    isUndefined,
    isInfinity,
    isArray,
    isBigInt,
    isBoolean,
    isFunction,
    isNumber,
    isObject,
    isObjectAndNotArray,
    isString,
    isSymbol,
    isInvalid,
    isEffective,
};