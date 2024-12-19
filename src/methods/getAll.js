/* 获取所有元素 */

// 导入依赖
import { GetValueFromStorage } from "../value/getValue.js"; // 导入获取存储内容的函数

/* ========== */

/**
 * 从存储中获取所有键值对
 * 
 * @function m_getAll
 * 
 * @param { { storage: Storage, warn: boolean } } classConfig 配置对象
 * 
 * @returns { { [key: string]: any } } 包含所有键值对的对象
 */
export function m_getAll(classConfig) {
    const allData = {};
    const keys = Array.from({
        length: classConfig.storage.length
    }, (_, i) => classConfig.storage.key(i));

    for (const key of keys)
        allData[key] = GetValueFromStorage(classConfig, key);

    return allData;
}