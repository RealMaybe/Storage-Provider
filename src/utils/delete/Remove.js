import { _Key } from "../Parameter.js";

/**
 * 删除存储元素
 * @function _Remove
 * @param { storage } storage - 存储对象
 * @param { boolean } - 决定用于删除单个项目还是清空存储
 *     - true 为删除单个
 *     - false 为清空
 * @param { string } key - 键名
 * @returns { void } 无返回值
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误
 */
export function _Remove(storage, judge, key) {
    if (
        judge &&
        key !== undefined &&
        key !== null
    ) {
        const KEY_ = _Key(key);
        storage.removeItem(KEY_)
    } else storage.clear()
};