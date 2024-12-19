/* 获取所有元素 */

// 导入依赖
import { GetValueFromStorage } from "../value/getValue.js"; // 导入获取存储内容的函数

/* ========== */

/**
 * 从存储中获取所有键值对
 * 
 * @function m_getAll
 * 
 * @param { { storage: Storage, warn: boolean } } config 配置对象
 * 
 * @returns { { [key: string]: any } } 包含所有键值对的对象
 */
export function m_getAll(config) {
    const allData = {};
    const keys = Array.from({
        length: config.storage.length
    }, (_, i) => config.storage.key(i));

    for (const key of keys)
        allData[key] = GetValueFromStorage(config, key);

    return allData;
}