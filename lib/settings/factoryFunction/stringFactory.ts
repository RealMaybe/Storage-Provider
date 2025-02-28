/* 字符串工厂函数 */


import { isString } from "../../type/checkType";


/* ========== */


/**
 * 字符串验证器工厂函数
 * @function stringFactory
 * @param { number } minLength 字符串的最小长度
 * @param { number } maxLength 字符串的最大长度
 * @param { string } name 属性名称
 * @returns { { validator: (value: any) => boolean, errorMessage: string } } 包含字符串验证器和错误信息的对象
 */
export const stringFactory = (
    minLength: number,
    maxLength: number,
    name: string
): {
    validator: (value: any) => boolean,
    errorMessage: string
} => ({
    validator: value =>
        isString(value) &&
        value.trim().length >= minLength &&
        value.trim().length <= maxLength,
    errorMessage: `The "${name}" property value is invalid. It must be a string with length between ${minLength} and ${maxLength}.`
});