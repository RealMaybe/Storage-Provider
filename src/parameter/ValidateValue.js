/* 验证参数值 */

// 导入依赖
import { ValidateArray } from "../validate/ValidateArray.js";
import { ValidateObject } from "../validate/ValidateObject.js";
import { ValidateString } from "../validate/ValidateString.js";

/**
 * 验证参数值
 * 
 * @function ValidateValue
 * 
 * @param { { warn: boolean } } config 配置对象
 * @param { any } value 需要验证的值
 * 
 * @return { any } 验证后的参数值
 */
export function ValidateValue(config, value) {
    try {
        if (value === null || value === undefined)
            throw new Error("This value cannot be null or undefined.");

        if (typeof value === "string")
            return ValidateString(config, value, "value");

        if (typeof value === "object" && value !== null && !Array.isArray(value))
            return ValidateObject(config, value);

        if (Array.isArray(value))
            return ValidateArray(config, value);

        if (typeof value === "number" || typeof value === "boolean")
            return value;
    } catch (err) {
        console.error(err);
    }
};