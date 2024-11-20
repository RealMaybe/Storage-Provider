// 导入依赖
import { ValidateObject } from "../validate/ValidateObject.js"; // 导入对象有效性检查器
import { m_getMany } from "./getMany.js"; // 导入获取多个数据的函数

/**
 * 验证器辅助函数
 * 
 * @function m_inspector
 * 
 * @param { { storage: String, warn: boolean } } classConfig 
 * @param { { [storageKey: string]: string | (item: any) => boolean } } obj
 * 
 * @returns { { all: boolean, tips: { [storageKey: string]: string }, errors: { [storageKey: string]: string } } } 验证结果对象
 */
export function m_inspector(classConfig, obj) {
    const _OBJ = ValidateObject(classConfig, obj);
    const _KEYS = Object.keys(_OBJ);

    // 如果对象为空
    if (_KEYS.length === 0)
        throw new Error("Invalid data type: The parameter 'obj' must be a non empty object.");

    const allTypesSet = new Set(["string", "number", "boolean", "function", "array", "object"]);
    let tips = {};
    let errors = {};

    let storageData = m_getMany(classConfig, _KEYS, "object");

    _KEYS.forEach(storageKey => {
        const validator = _OBJ[storageKey];
        const value = storageData[storageKey];

        if (value === undefined) {
            errors[storageKey] = `The value corresponding of "${storageKey}" does not exist or is invalid`;
            return;
        }

        if (typeof validator === "function" && !validator(value)) {
            errors[storageKey] = `Invalid format for "${storageKey}"`;
            return;
        }

        if (typeof validator === "string" && allTypesSet.has(validator)) {
            const typeCheck = validator;
            if (typeCheck === "array" && Array.isArray(value) && value.length === 0)
                tips[storageKey] = `Array for "${storageKey}" is empty`;
            else if (typeCheck === "object" && value !== null && Object.keys(value).length === 0)
                tips[storageKey] = `Object for "${storageKey}" is empty`;
            else if (typeof value !== typeCheck)
                errors[storageKey] = `Invalid format for "${storageKey}"`;
        }
    });

    return { all: Object.keys(errors).length === 0, tips, errors };
}