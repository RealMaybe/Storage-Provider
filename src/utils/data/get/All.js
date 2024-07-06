import { _getValueFromStorage } from "../../storageValue/getValue.js"

/* ========== */

/**
 * 从存储中获取所有键值对
 * 
 * @function $GetAll
 * 
 * @param { object } config 配置对象
 * @returns { object } 包含所有键值对的对象
 */
export function $GetAll(config) {
    const allData = {};

    for (let i = 0; i < config.storage.length; i++) {
        const key = config.storage.key(i),
            value = _getValueFromStorage(config, key);

        allData[key] = value;
    }

    return allData;
}