/* 验证参数值 */


import { type RealClassConfigType } from "../tsType/classConfigType"; // 实际使用的类配置类型
import {
    checkType, // 检查类型
    isInvalid, // 检查是否为无效值
    isEffective, // 检查是否为有效值
    isBigInt, // 检查是否为 BigInt
    isBoolean, // 检查是否为 Boolean
    isNumber, // 检查是否为 Number
    isObjectAndNotArray, // 检查是否为 Object
    isSymbol, // 检查是否为 Symbol
} from "../type/checkType";
import { ValidateArray } from "../validate/ValidateArray"; // 数组验证器
import { ValidateObject } from "../validate/ValidateObject"; // 对象验证器
import { ValidateString } from "../validate/ValidateString"; // 字符串验证器
import { ValidateFunction } from "../validate/ValidateFunction"; // 函数验证器


/* ========== */


/**
 * 验证器类型
 */
type Validator<T> = (config: RealClassConfigType<boolean>, value: T) => T;


/* ========== */


/**
 * 验证参数值
 * 
 * @function ValidateValue
 * 
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { any } value 需要验证的值
 * 
 * @return { any } 验证后的参数值
 */
export function ValidateValue<T>(
    classConfig: RealClassConfigType<boolean>,
    value: T
): T {
    // 定义验证器映射
    const validators: Record<string, Validator<any>> = {
        // array
        array: (
            set: RealClassConfigType<boolean>,
            val: Array<any>
        ) => ValidateArray(set, val),

        // bigint
        bigint: (
            _set: RealClassConfigType<boolean>,
            val: bigint
        ) => isBigInt(val) ? val : void 0,

        // boolean
        boolean: (
            _set: RealClassConfigType<boolean>,
            val: boolean
        ) => isBoolean(val) ? val : void 0,

        // function
        function: (
            set: RealClassConfigType<boolean>,
            val: (...args: Array<any>) => any
        ) => ValidateFunction(set, val),

        // number
        number: (
            _set: RealClassConfigType<boolean>,
            val: number
        ) => isNumber(val) ? val : void 0,

        // Not Array Object
        object: (
            set: RealClassConfigType<boolean>,
            val: { [key: string]: any }
        ) => isObjectAndNotArray(val) ? ValidateObject(set, val) : void 0,

        // string
        string: (
            set: RealClassConfigType<boolean>,
            val: string
        ) => ValidateString(set, val, "value"),

        // symbol
        symbol: (
            _set: RealClassConfigType<boolean>,
            val: symbol
        ) => isSymbol(val) ? val : void 0,
    };

    // 如果值是无效值，抛出错误
    if (isInvalid(value)) throw new TypeError("This value cannot be null, undefined or NaN.");

    // 获取值的类型
    const TYPE_: string = checkType(value);

    // 调用对应的验证器
    const validator: Validator<typeof value> | undefined = validators[TYPE_];
    if (isEffective(validator)) {
        const result = validator(classConfig, value);

        // 如果验证器返回了值，说明验证成功
        if (isEffective(result)) return result;

        // 如果验证器没有返回值，说明验证失败
        throw new TypeError(`Validation for type "${TYPE_}" failed without returning a result.`);
    }

    // 如果没有匹配的验证器，抛出错误
    throw new TypeError(`Unsupported value type: ${TYPE_}`);
};