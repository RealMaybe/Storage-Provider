/* 验证字符串有效性 */

/**
 * 验证字符串有效性
 * 
 * @function ValidateString
 * 
 * @param { { warn: boolean } } config 配置对象
 * @param { string } str 需要验证的字符串
 * @param { string } [tips = "str"] 错误提示信息
 * 
 * @returns { string } 验证后的字符串
 */
export function ValidateString(config, str, tips = "str") {
    // 验证参数类型
    if (str === undefined || str === null || typeof str !== "string")
        throw new Error(`Invalid data type: The parameter "${tips}" passed to this method must be of type string.`);

    // 空字符串警告
    if (config.warn && str.trim() === "")
        console.warn(`Warning: The parameter "${tips}" passed to this method is an empty string.`);

    // 返回验证后的字符串
    return str;
};