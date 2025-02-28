/* 获取所有元素 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { GetValueFromStorage } from "../value/getValue.js"; // 导入获取存储内容的函数

/* ========== */

/**
 * 从存储中获取所有键值对
 * 
 * @function m_getAll
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * 
 * @returns { { [key: string]: any } } 包含所有键值对的对象
 */
export function m_getAll(classConfig: TypeClassConfig): {
    [key: string]: any
} {
    const allData: { [key: string]: any } = {};
    const keys: Array<string> = Object.keys(classConfig.storage);

    for (const key of keys)
        allData[key] = GetValueFromStorage(classConfig, key);

    return allData;
}