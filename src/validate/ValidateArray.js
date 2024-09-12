/* 验证数组有效性 */

// 导入依赖
import { CheckCircular } from "../checker/checkCircular.js";

/**
 * 验证数组及内部属性的有效性
 * 
 * - 查验数组是否为非空数组。
 * - 查验数组的每个元素是否为有效值（可选地检查元素类型）。
 * 
 * @function ValidateArray
 * 
 * @param { { warn: boolean } } classConfig 配置对象
 * @param { Array<any> } arr 要验证的数组
 * @param { string } [type = null] 数组内所有元素的类型，默认为 null（不检查元素类型）
 * 
 * @returns { Array<any> } 返回传入的数组
 * 
 * @throws { Error } 验证失败时抛出错误
 * 
 * @summary 
 * - 如果传入的数组存在循环引用自身的行为，在默认情况下，控制台会提示警告信息
 * - 不建议传入存在循环引用自身的行为的数组，虽然这样并不会报错
 */
export function ValidateArray(classConfig, arr, type = null) {
    // 验证配置对象
    if (typeof classConfig !== "object" || !classConfig.hasOwnProperty("warn"))
        throw new Error(`Invalid configuration: The parameter "classConfig" must be an object and must contain the "warn" attribute.`);

    // 验证数组
    if (!Array.isArray(arr))
        throw new Error(`Invalid data type: The parameter "arr" passed to this method must be of type array.`);

    // 数组为空
    if (classConfig.warn && arr.length === 0)
        console.warn(`Warning: The array is empty.`);

    // 允许的类型列表
    if (type !== null) {
        const allowedTypes = ["number", "string", "boolean", "object", "function", "array", "undefined", "null", "symbol", "bigint"];

        // type不是字符串，或者不在允许的类型列表中
        if (typeof type !== "string" || !allowedTypes.includes(type))
            throw new Error(`Invalid type parameter: "${type}" is not a valid type. \nAllowed types are: "${allowedTypes.join('", "')}".`)

        // 数组内元素类型不符
        else {
            if (type === "array") {
                if (arr.some(item => !Array.isArray(item))) {
                    throw new Error(`Invalid data type: The elements in this array must be "array".`);
                }
            } else if (type === "null" || type === "undefined") {
                throw new Error(`Why do you need an array where all elements are null or undefined ?`);
            } else {
                if (arr.some(item => typeof item !== type)) {
                    throw new Error(`Invalid data type: The elements in this array must be of type "${type}".`);
                }
            }
        }
    }

    // 循环引用检测
    const { isCircular, warning, value } = CheckCircular(arr);
    if (classConfig.warn && isCircular) console.warn(warning);

    return classConfig.circular ? value : arr;
};