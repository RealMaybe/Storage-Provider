// 标准库、辅助函数
import { StorageProvider, isCircular, objectHaveSameKeys } from "./lib/main";

// 类型判断辅助函数
import {
    checkType,
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
    isEffective
} from "./typeChecker";

// 官方插件
import spp from "./plugin";


/* ========== */


export {
    StorageProvider as default,
    isCircular,
    objectHaveSameKeys,
    checkType,
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

    // 
    spp
}