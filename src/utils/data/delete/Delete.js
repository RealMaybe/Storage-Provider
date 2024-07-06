import { $Key } from "../../../methods/Parameter.js";
import { _getValueFromStorage } from "../../storageValue/getValue.js";

/* ========== */

/**
 * 删除存储元素。
 * 
 * @function $Delete
 * 
 * @param { object } config 配置对象
 * @param { Boolean } judge 决定用于删除单个项目还是清空存储，true 为删除单个，false 为清空
 * @param { String } key 键名
 * @return { void } 无返回值
 * 
 * @warning 如果传入的 key 对应的值不存在或者无效，则发出警告
 */
export function $Delete(config, judge, key) {
    if (!!judge &&
        key !== undefined &&
        key !== null
    ) {
        const KEY_ = $Key(key);

        // 对传入的须要删除的 key 是否有对应值进行验证，如果不存在或者无效，则发出警告
        if (!_getValueFromStorage(config, KEY_) && config.warn)
            console.warn(`Warning: Trying to delete a non-existent key from ${config.type}Storage. The key you want to delete is [${KEY_}].`);

        config.storage.removeItem(KEY_)
    } else config.storage.clear()
}