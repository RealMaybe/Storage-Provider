/* 获取或设置值 */

import { GetValueFromStorage } from "../value/getValue.js";
import { SetValueToStorage } from "../value/setValue.js";

/**
 * 从存储中获取值或者设置值
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * - 本函数会根据 value 的有效性来进行获取和存储数据
 * 
 * @function m_store
 * 
 * @param { { storage: Storage, warn: boolean } } config 配置对象
 * @param { string } key 键名
 * @param { any } value 值
 * 
 * @returns { any | void } 获取到的值或者无返回值
 */
export function m_store(config, key, value) {
    // value 无效，获取 key 对应的内容
    if (value === undefined || value === null)
        return GetValueFromStorage(config, key);

    // value 有效，设置 key 和 value 值
    else if (value !== undefined && value !== null)
        SetValueToStorage(config, key, value);

    // 其他情况，获取 key 对应的内容
    else return GetValueFromStorage(config, key);
};