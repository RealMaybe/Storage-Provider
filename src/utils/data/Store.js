import { _Key } from "../Parameter.js";
import { getValueFromStorage } from "./value/get.js";
import { setValueToStorage } from "./value/set.js";

/**
 * 从存储中获取值或者设置值
 * @function _Store
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * - 本函数会根据 value 的有效性来进行获取和存储数据
 * @param { Storage } storage - 存储对象，如 localStorage 或 sessionStorage
 * @param { string } key - 键名
 * @param { * } value - 值
 * @returns { void | * } 获取到的值或者无返回值
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误
 */
export function _Store(storage, key, value) {
    // value 无效，获取 key 对应的内容
    if (value === undefined || value === null)
        return getValueFromStorage(storage, key);

    // value 有效，设置 key 和 value 值
    else if (value !== undefined && value !== null)
        setValueToStorage(storage, key, value);

    // 其他情况，获取 key 对应的内容
    else
        return getValueFromStorage(storage, key);
};