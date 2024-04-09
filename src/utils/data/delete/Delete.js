import { $Key } from "../../../methods/Parameter.js";

/* ========== */

/**
 * 删除存储元素
 * 
 * @function $Delete
 * 
 * @param { object } config 存储对象
 * @param { boolean } judge 决定用于删除单个项目还是清空存储，true 为删除单个，false 为清空
 * @param { string } key 键名
 */
export function $Delete(config, judge, key) {
    if (
        judge &&
        key !== undefined &&
        key !== null
    ) {
        const KEY_ = $Key(key);
        config.storage.removeItem(KEY_)
    } else config.storage.clear()
}