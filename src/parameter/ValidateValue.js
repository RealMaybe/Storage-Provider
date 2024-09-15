/* 验证参数值 */

// 导入依赖
import { ValidateArray } from "../validate/ValidateArray.js"; // 数组验证器
import { ValidateObject } from "../validate/ValidateObject.js"; // 对象验证器
import { ValidateString } from "../validate/ValidateString.js"; // 字符串验证器
import { ValidateFunction } from "../validate/ValidateFunction.js"; // 函数验证器

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
    // 定义验证器
    const validators = {
        array: (c, v) => ValidateArray(c, v),
        bigint: (c, v) => v,
        boolean: (c, v) => v,
        function: (c, v) => ValidateFunction(c, v),
        number: (c, v) => v,
        object: (c, v) => { if (v !== null && !Array.isArray(v)) return ValidateObject(c, v) },
        string: (c, v) => ValidateString(c, v, "value"),
        symbol: (c, v) => v
    };

    // 验证参数类型
    try {
        if (value === null || value === undefined)
            throw new Error("This value cannot be null or undefined.");

        const TYPE_ = typeof value;
        if (TYPE_ === "object" && Array.isArray(value)) TYPE_ = "array";

        // 调用对应的验证器
        const validator = validators[TYPE_];
        if (validator) {
            const result = validator(config, value);

            // 如果验证器返回了值，说明验证成功
            if (result !== undefined) return result;

            // 如果验证器没有返回值，说明验证失败
            throw new Error(`Validation for type "${TYPE_}" failed without returning a result.`);
        }

        // 如果没有匹配的验证器，抛出错误
        throw new Error(`Unsupported value type: ${TYPE_}`);
    } catch (err) { console.error(err) }
};