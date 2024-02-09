import { _Key, _Value } from "../../Parameter.js";

/**
 * 从存储中获取指定键的值
 * @function getValueFromStorage
 * - 本函数中已经验证了 key 和 value 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * @param { Storage } storage - 存储对象
 * @param { string } key - 要获取的键名
 * @returns { * } - 存储的值，如果没有找到则返回null
 */
export function setValueToStorage(storage, key, value) {
    const KEY_ = _Key(key),
        VALUE_ = _Value(value);

    storage.setItem(KEY_, JSON.stringify(VALUE_));
}