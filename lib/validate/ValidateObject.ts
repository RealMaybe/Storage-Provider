/* 验证对象有效性 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import { CheckCircular } from "../checker/checkCircular";
import { isObjectAndNotArray, isInvalid } from "../type/checkType";


/* ========== */


/**
 * 验证对象及内部属性的有效性
 * 
 * - obj 必须是一个对象，并且不能是数组。
 * - 这是为了确保只有键值对存在于 obj 中，而不是其他类型的数据。
 * 
 * @function ValidateObject
 * 
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { { [key: string]: any } } obj 需要验证的对象
 * @param { boolean } [type = false] 是否查验对象内属性对应的值的类型
 * - 默认为 false（不检查值的类型）
 * 
 * @returns { { [key: string]: any } } 返回检查后的对象
 * 
 * @throws { Error } 验证失败时抛出错误
 * 
 * @summary 
 * - 如果传入的对象存在循环引用自身的行为，在默认情况下，控制台会提示警告信息
 * - 不建议传入存在循环引用自身的行为的对象，虽然这样并不会报错
 */
export function ValidateObject(
    classConfig: RealClassConfigType<boolean>,
    obj: { [key: string]: any },
    type: boolean = false
): { [key: string]: any } {
    // 验证对象  
    if (!isObjectAndNotArray(obj))
        throw new TypeError(`The parameter "obj" must be a non-null, non-array object.`);

    // 验证对象中的每个属性值都不为无效值
    for (const key in obj) {
        if (obj.hasOwnProperty(key) &&
            isInvalid(obj[key])
        ) {
            let warnOrErr = `The object contains an invalid value (null or undefined) for key "${key}".`;
            if (!type && classConfig.warn) console.warn("Warning: " + warnOrErr);
            else if (type) throw new TypeError("Error: " + warnOrErr);
        }
    }

    // 循环引用检测
    if (classConfig.circular) {
        const { isCircular, warning, value } = CheckCircular(classConfig, obj);
        if (classConfig.warn && isCircular) console.warn(warning);

        return value
    }

    // 返回值
    return obj;
};