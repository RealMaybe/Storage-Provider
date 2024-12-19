/* 验证字符串有效性 */

/**
 * 验证字符串有效性
 * 
 * @function ValidateString
 * 
 * @param { { warn: boolean } } classConfig 配置对象
 * @param { string } str 需要验证的字符串
 * @param { string } [keyName = "str"] 错误提示信息
 * @param { string } [methodName = "this method"] 方法名称提示信息
 * 
 * @returns { string } 验证后的字符串
 */
export function ValidateString(classConfig, str, keyName = "str", methodName = "this method") {
    // 验证参数类型
    if (str === void 0 || str === null || typeof str !== "string")
        throw new Error(`Invalid data type: The parameter "${keyName}" passed to ${methodName} must be of type string.`);

    // 空字符串警告
    if (classConfig.warn && str.trim() === "")
        console.warn(`Warning: The parameter "${keyName}" passed to ${methodName} is an empty string.`);

    // 返回验证后的字符串
    return str;
};