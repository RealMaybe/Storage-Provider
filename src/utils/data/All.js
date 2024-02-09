import { getValueFromStorage } from "./value/get.js";

/**
 * 从存储中获取所有键值对
 * @function _All
 * @param { Storage } storage - 存储对象，如 localStorage 或 sessionStorage
 * @returns { Object } 包含所有键值对的对象
 */
export function _All(storage) {
    const allData = {};

    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        const value = getValueFromStorage(storage, key)
        allData[key] = value;
    }

    return allData;
}