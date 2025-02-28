/* 验证参数键名是否合法 */

// 导入依赖
import { ValidateString } from "../validate/ValidateString.js";

/**
 * 验证参数键名是否合法
 * 
 * @function ValidateKey
 * 
 * @param { { warn: boolean } } classConfig 配置对象
 * @param { string } key 需要验证的键名
 * @param { string } methodName 方法名
 * 
 * @return { string } 验证后的键名
 */
export function ValidateKey(classConfig, key, methodName = "this method") {
    if (key === "") throw new Error(`In ${methodName}, the key must be a valid string`);
    else return ValidateString(classConfig, key, "key", methodName);
}