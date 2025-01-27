/* 验证数组有效性 */

// 导入依赖
import { CheckCircular } from "../checker/checkCircular.js";

/* ========== */

/**
 * 验证数组及内部属性的有效性
 * 
 * - 查验数组是否为非空数组。
 * - 查验数组的每个元素是否为有效值（可选地检查元素类型）。
 * 
 * @function ValidateArray
 * 
 * @param { { warn: boolean, circular: boolean } } classConfig 配置对象
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
    // 验证数组
    if (!Array.isArray(arr))
        throw new Error(`Invalid data type: The parameter "arr" passed to this method must be of type array.`);

    // 数组为空
    if (classConfig.warn && arr.length === 0)
        console.warn(`Warning: The array is empty.`);

    // 允许的类型列表
    const allowedTypes = ["array", "bigint", "boolean", "function", "null", "number", "object", "string", "symbol", "undefined"];

    // 检查类型参数
    if (type !== null) {
        if (typeof type !== "string" || !allowedTypes.includes(type))
            throw new Error(`Invalid type parameter: "${type}" is not a valid type. \nAllowed types are: "${allowedTypes.join('", "')}".`);

        // 特殊处理null和void 0
        if (type === "null" || type === "void 0")
            throw new Error(`Why do you need an array where all elements are ${type} ?`);

        // 检查数组元素类型
        const isValidType = type === "array" ?
            item => Array.isArray(item) :
            item => typeof item === type;

        if (arr.some(item => !isValidType(item)))
            throw new Error(`Invalid data type: The elements in this array must be of type "${type}".`);
    }

    // 循环引用检测
    if (classConfig.circular) {
        const { isCircular, warning, value } = CheckCircular(classConfig, arr);
        if (classConfig.warn && isCircular) console.warn(warning);

        return value
    }

    // 返回值
    return arr;
};