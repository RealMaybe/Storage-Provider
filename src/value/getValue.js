/* 获取本地存储的值 */

// 导入依赖
import { ValidateKey } from "../parameter/ValidateKey.js";

/**
 * 从存储中获取指定键的值
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * 
 * @function GetValueFromStorage
 * 
 * @param { { storage: Storage, warn: boolean } } classConfig 配置对象
 * @param { string } key 要获取的键名
 * 
 * @returns { any } 存储的值，如果没有找到则返回null
 */
export function GetValueFromStorage(classConfig, key) {
    const KEY_ = ValidateKey(classConfig, key);
    const storedValue = classConfig.storage.getItem(KEY_);

    return storedValue ? JSON.parse(storedValue) : null;
}