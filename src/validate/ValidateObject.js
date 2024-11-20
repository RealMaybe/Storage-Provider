/* 验证对象有效性 */

// 导入依赖
import { CheckCircular } from "../checker/checkCircular.js";

/**
 * 验证对象及内部属性的有效性
 * 
 * - obj 必须是一个对象，并且不能是数组。
 * - 这是为了确保只有键值对存在于 obj 中，而不是其他类型的数据。
 * 
 * @function ValidateObject
 * 
 * @param { { warn: boolean } } classConfig 配置对象
 * @param { object } obj 一个对象
 * 
 * @returns { object } 返回传入的对象
 * 
 * @throws { Error } 验证失败时抛出错误
 * 
 * @summary 
 * - 如果传入的对象存在循环引用自身的行为，在默认情况下，控制台会提示警告信息
 * - 不建议传入存在循环引用自身的行为的对象，虽然这样并不会报错
 */
export function ValidateObject(classConfig, obj) {
    // 验证配置对象
    if (typeof classConfig !== "object" ||
        !classConfig.hasOwnProperty("warn")
    ) throw new Error(`Invalid configuration: The parameter "classConfig" must be an object and must contain the "warn" attribute.`);

    // 验证对象  
    if (obj === undefined ||
        obj === null ||
        Array.isArray(obj) ||
        typeof obj !== "object"
    )
        throw new Error(`Invalid data type: The parameter "obj" must be a non-null, non-array object.`);

    // 验证对象中的每个属性值都不为 undefined 或 null  
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];

            if (val === undefined || val === null)
                throw new Error(`Invalid object: The object contains an invalid value (undefined or null) for key "${key}".`);
        }
    };

    // 循环引用检测
    const { isCircular, warning, value } = CheckCircular(obj);
    if (classConfig.warn && isCircular) console.warn(warning);

    // 返回验证后的值 
    return classConfig.circular ? value : obj;
};