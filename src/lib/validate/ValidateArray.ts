/* 验证数组有效性 */

import { type RealClassConfigType } from "../../scriptType/classConfigType.js";
import { isArray, isString, checkType, isObjectAndNotArray, isInvalid } from "../../type/checkType.js";
import { allTypes } from "../../type/allTypes.js"; // 类型列表
import { CheckCircular } from "../checker/checkCircular.js";


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

/**
 * 抛出一个带有指定消息的 TypeError。
 * 该函数用于处理无效的类型参数，并提供清晰的错误信息。
 *
 * @param { string } t 导致错误的类型参数，在错误消息中包含。
 * @param { Array<string> } [e=EffectiveFormat] 可选的有效类型参数数组，用于在错误消息中列出允许的类型。
 * - 如果未提供，则默认为 EffectiveFormat。
 */
const throwError = (
    t: string,
    e: Array<string>
): void => { throw new TypeError(`Invalid type parameter: "${t}" is not a valid type. \nAllowed types are: "${e.join('", "')}".`) };


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

    // 定义有效类型集合
    const stringsToRemove = new Set(["null", "undefined"]);
    const EffectiveFormat = allTypes.filter(item => !stringsToRemove.has(item));

    // 如果 type 参数存在且不为空字符串，则进行类型检查
    if (isString(type) && type.trim() !== "") {
        if (!EffectiveFormat.includes(type)) throwError(type, EffectiveFormat);

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
    // 如果 type 参数无效，则抛出错误
    else if (isInvalid(type)) throwError(type, EffectiveFormat);

    // 根据参数配置进行循环引用检查
    if (classConfig.circular) {
        const { isCircular, warning, value } = CheckCircular(classConfig, arr);

        if (classConfig.warn && isCircular) console.warn(warning);

        return value as ValidArrayType<T>;
    }

    return arr as ValidArrayType<T>;
}