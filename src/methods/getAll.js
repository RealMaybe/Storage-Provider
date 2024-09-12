/* 获取所有元素 */

// 导入依赖
import { GetValueFromStorage } from "../value/getValue.js";

/* ========== */

/**
 * 从存储中获取所有键值对
 * 
 * @function m_getAll
 * 
 * @param { object } config 配置对象
 * @returns { { [key: string]: any } } 包含所有键值对的对象
 */
export function m_getAll(config) {
    const allData = {};

    for (let i = 0; i < config.storage.length; i++) {
        const key = config.storage.key(i),
            value = GetValueFromStorage(config, key);

        allData[key] = value;
    }

    return allData;
}