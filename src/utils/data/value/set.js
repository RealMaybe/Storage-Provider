import { _Key, _Value } from "../../Parameter.js";

/**
 * 将数据存储到 web Storage 中
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * @param { Storage } storage 存储对象
 * @param { string } key 要存储的键名
 * @param { * } value 要存储的数据
 */
export function setValueToStorage(storage, key, value) {
    const KEY_ = _Key(key),
        VALUE_ = _Value(value);

    let cache = [];
    storage.setItem(KEY_, JSON.stringify(VALUE_, (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) return;
            cache.push(value);
        }
        return value;
    }));
    cache = null
}