/* 验证字符串是否符合指定的正则表达式 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { validationRegexes } from "../var/RegExp";

/**
 * 验证字符串是否符合指定的正则表达式
 * 
 * @function ValidateStringWithRegExp
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * @param { string } str 需要验证的字符串
 * @param { RegExp | string } [type = null] 用于验证字符串的正则表达式，可以是 RegExp 对象，也可以是以下预定义的字符串：
 * - "email"、"phone"、"tel"、"idcard"、"bankcard"、"password"、"username"
 * 
 * @returns { string } 验证后的字符串
 */
export function ValidateStringWithRegExp(
    classConfig: TypeClassConfig,
    str: string,
    type: RegExp | string | null = null
): string {
    // 验证参数类型
    if (str === void 0 || str === null || typeof str !== "string")
        throw new Error(`Invalid data type: The parameter "str" passed to this method must be of type string.`);

    // 空字符串警告
    if (classConfig.warn && str.trim() === "")
        console.warn(`Warning: The parameter "str" passed to this method is an empty string.`);

    // 验证正则表达式或预定义类型  
    if (type !== null && type !== void 0) {
        let regex: RegExp | null = null;

        if (typeof type === "string") {
            // 检查是否为预定义的正则表达式  
            if (validationRegexes.hasOwnProperty(type))
                regex = validationRegexes[type];

            // 如果不是预定义类型，且classConfig.warn为真，则发出警告  
            else if (classConfig.warn)
                console.warn(`Warning: The provided "type" "${type}" does not exist in the validationRegexes object.`);
        }

        // 直接使用提供的RegExp对象  
        else if (type instanceof RegExp)
            regex = type;

        // 如果type不是字符串也不是RegExp，且classConfig.warn为真，则发出警告
        else if (classConfig.warn)
            console.warn(`Warning: The parameter "type" must be a string or a RegExp object.`);

        // 使用正则表达式进行验证  
        if (regex &&
            !regex.test(str) &&
            classConfig.warn
        ) console.warn(`Warning: The parameter "str" passed to this method does not match the ${type} pattern.`);
    }

    // 返回验证后的字符串
    return str;
};