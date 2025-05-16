/* 验证器工厂函数 */


import {
    isNumber,
    isString,
} from "../../../typeChecker";


/* ========== */


/**
 * 创建验证器工厂函数
 * @function validatorFactory
 * @param { string } type 验证器类型，支持 "number" 或 "string"
 * @param { { min: number, max: number } } length 长度范围对象，包含最小值和最大值
 * @returns { (...value: Array<any>) => boolean } 返回一个验证函数，用于验证给定的值是否符合指定的类型和长度范围
 */
export function validatorFactory(
    type: "number" | "string",
    length: {
        min: number,
        max: number,
    }
): (...value: Array<any>) => boolean {
    const validator: {
        [key: string]: (...value: Array<any>) => boolean
    } = {
        number: (value: any): boolean => isNumber(value) &&
            Number.isInteger(value) &&
            value >= length.min &&
            value <= length.max,
        string: (value: any): boolean => isString(value) &&
            value.length >= length.min &&
            value.length <= length.max
    };

    return validator[type] || (() => false);
};