/* 验证参数键名是否合法 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { ValidateString } from "../validate/ValidateString";

/**
 * 验证参数键名是否合法
 * 
 * @function ValidateKey
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * @param { string } key 需要验证的键名
 * @param { string } methodName 方法名
 * 
 * @return { string } 验证后的键名
 */
export function ValidateKey(
    classConfig: TypeClassConfig,
    key: string,
    methodName: string = "this method"
): string {
    if (key === "") throw new Error(`In ${methodName}, the key must be a valid string`);
    else return ValidateString(classConfig, key, "key", methodName);
}