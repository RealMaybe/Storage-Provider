/* 验证器辅助函数 */

// 导入依赖
import { ValidateObject } from "../validate/ValidateObject.js"; // 导入对象有效性检查器
import { m_getMany } from "./getMany.js"; // 导入获取多个数据的函数

/**
 * 验证器辅助函数
 * 
 * @function m_inspector
 * 
 * @param { { storage: String, warn: boolean } } classConfig - 配置对象，包含存储信息和警告标志
 * @param { { [storageKey: string]: string | (item: any) => boolean } } obj - 包含需要验证的键值对的对象
 * 
 * @returns { { all: boolean, tips: { [storageKey: string]: string }, errors: { [storageKey: string]: string } } } - 验证结果对象
 */
export function m_inspector(classConfig, obj) {
    // 使用 ValidateObject 验证传入的对象
    const validatedObj = ValidateObject(classConfig, obj);
    const keys = Object.keys(validatedObj);

    // 如果对象为空，抛出错误
    if (keys.length === 0)
        throw new Error("Invalid data type: The parameter 'obj' must be a non-empty object.");

    // 定义有效的类型集合
    const validTypes = new Set(["string", "number", "boolean", "function", "array", "object"]);
    let tips = {}; // 存储提示信息的对象
    let errors = {}; // 存储错误信息的对象

    // 从存储中获取多个值
    const storageData = m_getMany(classConfig, keys, "object");

    // 遍历每个键进行验证
    keys.forEach(storageKey => {
        const validator = validatedObj[storageKey]; // 获取验证规则
        const value = storageData[storageKey]; // 获取存储中的值

        // 如果值不存在或无效，记录错误信息
        if (value === void 0) {
            errors[storageKey] = `The value corresponding to "${storageKey}" does not exist or is invalid`;
            return;
        }

        // 如果验证规则是一个函数，调用该函数进行验证
        if (typeof validator === "function" && !validator(value)) {
            errors[storageKey] = `Invalid format for "${storageKey}"`;
            return;
        }

        // 如果验证规则是一个字符串且是有效类型之一
        if (typeof validator === "string" && validTypes.has(validator)) {
            const expectedType = validator;

            // 根据预期类型进行不同的验证
            if (expectedType === "array") {
                if (!Array.isArray(value))
                    errors[storageKey] = `Invalid format for "${storageKey}": Expected array`;
                else if (value.length === 0)
                    tips[storageKey] = `Array for "${storageKey}" is empty`;
            } else if (expectedType === "object") {
                if (value === null || typeof value !== "object")
                    errors[storageKey] = `Invalid format for "${storageKey}": Expected object`;
                else if (Object.keys(value).length === 0)
                    tips[storageKey] = `Object for "${storageKey}" is empty`;
            } else if (typeof value !== expectedType) {
                errors[storageKey] = `Invalid format for "${storageKey}": Expected ${expectedType}`;
            }
        }
    });

    // 返回验证结果对象
    return { all: Object.keys(errors).length === 0, tips, errors };
}