/* 验证参数键名是否合法 */


import { type RealClassConfigType } from "../tsType/classConfigType"; // 实际使用的类配置类型
import { ValidateString } from "../validate/ValidateString"; // 验证字符串有效性


/* ========== */


/**
 * 验证参数键名是否合法
 * 
 * @function ValidateKey
 * 
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { string } key 需要验证的键名
 * @param { string } [methodName = "this method"] 方法名
 * 
 * @return { string } 验证后的键名
 */
export function ValidateKey(
    classConfig: RealClassConfigType<boolean>,
    key: string,
    methodName: string = "this method"
): string {
    if (key === "") throw new TypeError(`In ${methodName}, the key must be a valid string`);
    else return ValidateString(classConfig, key, "key", methodName);
}