import { _Key } from "../../Parameter.js";

/**
 * 从存储中获取指定键的值
 * @function getValueFromStorage
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * @param { Storage } storage - 存储对象
 * @param { string } key - 要获取的键名
 * @returns { * } - 存储的值，如果没有找到则返回null
 */
export function getValueFromStorage(storage, key) {
    const KEY_ = _Key(key);

    const storedValue = storage.getItem(KEY_);
    return storedValue ? JSON.parse(storedValue) : null;
}