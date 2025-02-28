/* 验证器辅助函数 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import { ValidateObject } from "../validate/ValidateObject"; // 导入对象有效性检查器
import { objKeys } from "../assistant/objKeys";
import { checkType, isArray, isFunction, isInvalid, isObjectAndNotArray, isString } from "../type/checkType"
import { m_getMany } from "./getMany"; // 导入获取多个数据的函数


/* ========== */


/**
 * @description 检测结果类型
 * @type { Object }
*/
export type $inspector = {
    all: boolean,
    tips: {
        [storageKey: string]: string
    },
    errors: {
        [storageKey: string]: string
    }
}


/* ========== */


/**
 * 验证器辅助函数
 * 
 * @function m_inspector
 * 
 * @param { RealClassConfigType<boolean> } classConfig - 配置对象，包含存储信息和警告标志
 * @param { { [storageKey: string]: string | ((item: any) => boolean) } } obj - 包含需要验证的键值对的对象
 * 
 * @returns { $inspector } - 验证结果对象
 */
export function m_inspector(
    classConfig: RealClassConfigType<boolean>,
    obj: { [storageKey: string]: string | ((item: any) => boolean) }
): $inspector {
    // 使用 ValidateObject 验证传入的对象
    const validatedObj: { [storageKey: string]: string | ((item: any) => boolean) } = ValidateObject(classConfig, obj);
    const keys = objKeys(validatedObj);

    // 如果对象为空，抛出错误
    if (keys.length === 0)
        throw new TypeError("Invalid data type: The parameter 'obj' must be a non-empty object.");

    // 定义有效的类型集合
    const validTypes = new Set(["string", "number", "boolean", "function", "array", "object"]);
    let tips: { [tipsKey: string]: string } = {}; // 存储提示信息的对象
    let errors: { [errorsKey: string]: string } = {}; // 存储错误信息的对象

    // 从存储中获取多个值
    const storageData = m_getMany(classConfig, keys, "object");

    // 遍历每个键进行验证
    keys.forEach(storageKey => {
        const validator = validatedObj[storageKey]; // 获取验证规则
        const value = storageData[storageKey]; // 获取存储中的值

        // 如果值不存在或无效，记录错误信息
        if (isInvalid(value)) {
            errors[storageKey] = `The value corresponding to "${storageKey}" does not exist or is invalid.`;
            return;
        }

        // 如果验证规则是一个函数，调用该函数进行验证
        if (isFunction(validator) && !(validator as (item: any) => boolean)(value)) {
            errors[storageKey] = `Invalid format for "${storageKey}".`;
            return;
        }

        // 如果验证规则是一个字符串且是有效类型之一
        if (isString(validator) && validTypes.has(validator as string)) {
            const expectedType = validator;

            // 如果验证规则要求是数组
            if (expectedType === "array") {
                if (!isArray(value))
                    errors[storageKey] = `Invalid format for "${storageKey}": Expected array.`;
                else if (value.length === 0)
                    tips[storageKey] = `Array for "${storageKey}" is empty.`;
            }

            // 如果验证规则要求是对象
            else if (expectedType === "object") {
                if (!isObjectAndNotArray(value))
                    errors[storageKey] = `Invalid format for "${storageKey}": Expected object.`;
                else if (objKeys(value).length === 0)
                    tips[storageKey] = `Object for "${storageKey}" is empty.`;
            }

            // 如果对应值的类型与验证规则要求不符
            else if (checkType(value) !== expectedType)
                errors[storageKey] = `Invalid format for "${storageKey}": Expected ${expectedType}.`;
        }
    });

    // 返回验证结果对象
    return { all: objKeys(errors).length === 0, tips, errors };
}