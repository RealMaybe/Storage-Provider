import { $Key } from "../../methods/Parameter.js";

/* ========== */

/**
 * 从存储中获取指定键的值
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * 
 * @function _getValueFromStorage
 * 
 * @param { object } config 配置对象
 * @param { string } key 要获取的键名
 * @returns { * } 存储的值，如果没有找到则返回null
 */
export function _getValueFromStorage(config, key) {
    const KEY_ = $Key(key),
        storedValue = config.storage.getItem(KEY_);

    return storedValue ? JSON.parse(storedValue) : null;
}