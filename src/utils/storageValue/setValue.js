import { $Key, $Value } from "../../methods/Parameter.js";

/* ========== */

/**
 * 将数据存储到 web Storage 中
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * 
 * @function _setValueToStorage
 * 
 * @param { object } config 配置对象
 * @param { string } key 要存储的键名
 * @param { * } value 要存储的数据
 */
export function _setValueToStorage(config, key, value) {
    const KEY_ = $Key(key),
        VALUE_ = $Value(config, value);

    // 创建缓存数组
    let cache = [];

    // 存储数据，如果存在循环引入将会处理掉
    config.storage.setItem(KEY_, JSON.stringify(VALUE_, (_, val) => {
        if (typeof val === "object" && val !== null) {
            if (cache.indexOf(val) !== -1) return;
            cache.push(val)
        }
        return val
    }));

    // 清除缓存
    cache = null
}