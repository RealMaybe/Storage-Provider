/* 验证数组有效性 */

import { type RealClassConfigType } from "../tsType/classConfigType";
import { isArray, isString, checkType, isObjectAndNotArray } from "../type/checkType.js";
import { allTypes } from "../type/allTypes.js"; // 类型列表
import { CheckCircular } from "../checker/checkCircular";


/* ========== */

/**
 * 允许的数组内元素类型
 */
type ArrayStringType = "" | "array" | "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol";

/** 
 * 定义一个条件类型来推断返回的数组类型
 */
type ValidArrayType<T extends ArrayStringType> =
    T extends "" ? Array<any> :
    T extends "array" ? Array<Array<any>> :
    T extends "bigint" ? Array<bigint> :
    T extends "boolean" ? Array<boolean> :
    T extends "function" ? Array<Function> :
    T extends "number" ? Array<number> :
    T extends "object" ? Array<{ [key: string]: any }> :
    T extends "string" ? Array<string> :
    T extends "symbol" ? Array<symbol> :
    never;

/**
 * 验证数组配置类型
 */
type ArrayConfigType = {
    empty?: boolean,
    type?: ArrayStringType
};


/* ========== */


const stringsToRemove = new Set(["null", "undefined"]);
const EffectiveFormat = allTypes.filter(item => !stringsToRemove.has(item));


/* ========== */


/**
 * 验证数组及内部属性的有效性
 * - 查验参数是否为有效数组。
 * 
 * @function ValidateArray
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { Array<any> } arr 要验证的数组
 * @param { ArrayConfigType } validator 验证器参数
 * @returns { ValidArrayType<""> } 返回检查后的数组
 * @throws { Error } 验证失败时抛出错误
 * @summary 
 * - 如果传入的数组存在循环引用自身的行为，在默认情况下，控制台会提示警告信息
 * - 不建议传入存在循环引用自身的行为的数组，虽然这样并不会报错
 */
export function ValidateArray<T extends ArrayStringType>(
    classConfig: RealClassConfigType<boolean>,
    arr: Array<any>,
    validator: ArrayConfigType = { empty: false, type: "" }
): ValidArrayType<T> {
    const { empty, type } = { empty: false, type: "", ...validator };

    if (!isArray(arr))
        throw new TypeError(`Invalid data type: The parameter "arr" passed to this method must be of type array.`);

    if (arr.length === 0) {
        if (!empty)
            throw new TypeError(`Invalid data type: The array is empty.`);
        if (empty && classConfig.warn)
            console.warn(`Warning: The array is empty.`);
    }

    if (isString(type) && type.trim() !== "") {
        if (!EffectiveFormat.includes(type))
            throw new TypeError(`Invalid type parameter: "${type}" is not a valid type. \nAllowed types are: "${EffectiveFormat.join('", "')}".`);

        const isValidType = (item: any): boolean => {
            switch (type) {
                case "array":
                    return isArray(item);
                case "object":
                    return isObjectAndNotArray(item);
                default:
                    return checkType(item) === type;
            }
        };

        if (arr.some(item => !isValidType(item)))
            throw new TypeError(`Invalid data type: The elements in this array must be of type "${type}".`);
    }

    if (classConfig.circular) {
        const { isCircular, warning, value } = CheckCircular(classConfig, arr);

        if (classConfig.warn && isCircular) console.warn(warning);

        return value as ValidArrayType<T>;
    }

    return arr as ValidArrayType<T>;
}