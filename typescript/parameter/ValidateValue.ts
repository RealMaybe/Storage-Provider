/* 验证参数值 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig.js";
import { ValidateArray } from "../validate/ValidateArray.js"; // 数组验证器
import { ValidateObject } from "../validate/ValidateObject.js"; // 对象验证器
import { ValidateString } from "../validate/ValidateString.js"; // 字符串验证器
import { ValidateFunction } from "../validate/ValidateFunction.js"; // 函数验证器

/* ========== */

/**
 * 验证参数值
 * 
 * @function ValidateValue
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * @param { any } value 需要验证的值
 * 
 * @return { any } 验证后的参数值
 */
export function ValidateValue<AnyValue>(
    classConfig: TypeClassConfig,
    value: AnyValue
): AnyValue {
    // 定义验证器
    const validators = {
        array: (set: TypeClassConfig, val: Array<any>): Array<any> | void => ValidateArray(set, val),
        bigint: (set: TypeClassConfig, val: bigint): bigint | void => typeof val === "bigint" ? val : void 0,
        boolean: (set: TypeClassConfig, val: boolean): boolean | void => typeof val === "boolean" ? val : void 0,
        function: (set: TypeClassConfig, val: Function): { [key: string]: any } => ValidateFunction(set, val),
        number: (set: TypeClassConfig, val: number): number | void => typeof val === "number" ? val : void 0,
        object: (set: TypeClassConfig, val: object): object | void => val !== null && !Array.isArray(val) ? ValidateObject(set, val) : void 0,
        string: (set: TypeClassConfig, val: string): string | void => ValidateString(set, val, "value"),
        symbol: (set: TypeClassConfig, val: symbol): symbol | void => typeof val === "symbol" ? val : void 0
    };

    // 如果值是无效值，抛出错误
    if (value === null ||
        value === void 0 ||
        Number.isNaN(value)
    ) throw new Error("This value cannot be null, void 0 or NaN.");

    // 获取值的类型
    let TYPE_: string;
    if (Array.isArray(value)) TYPE_ = "array";
    else TYPE_ = typeof value;

    // 调用对应的验证器
    const validator: Function = validators[TYPE_];
    if (validator) {
        const result = validator(classConfig, value);

        // 如果验证器返回了值，说明验证成功
        if (result !== void 0) return result as AnyValue;

        // 如果验证器没有返回值，说明验证失败
        throw new Error(`Validation for type "${TYPE_}" failed without returning a result.`);
    }

    // 如果没有匹配的验证器，抛出错误
    throw new Error(`Unsupported value type: ${TYPE_}`);
};