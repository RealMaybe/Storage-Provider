/* 获取所有元素 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import { objKeys } from "../assistant/objKeys";
import { GetValueFromStorage } from "../value/getValue"; // 导入获取存储内容的函数


/* ========== */


/**
 * 从存储中获取所有键值对
 * 
 * @function m_getAll
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @returns { { [key: string]: any } } 包含所有键值对的对象
 */
export function m_getAll(
    classConfig: RealClassConfigType<boolean>
): {
    [key: string]: any
} {
    const allData: { [key: string]: any } = {};
    const keys = objKeys(classConfig.storage);

    for (const key of keys) {
        try {
            allData[key] = GetValueFromStorage(classConfig, key);
        } catch (err) { throw new TypeError(`Failed to retrieve value for key "${key}":` + err) }
    }

    return allData;
}