import { _Object } from "../Parameter.js";
import { _Store } from "./Store.js";

/**
 * 用于操作数组中的对象，获取对象中的 key 属性和 value 属性对应的值并保存。
 * @function _ObjectMany
 * @param { storage } storage 
 * @param { array } arr 
 */
export function _ObjectMany(storage, arr) {
    arr.forEach(item => {
        const ITEM_ = _Object(item);

        if (!ITEM_.key ||
            !ITEM_.value ||
            ITEM_.key === null ||
            ITEM_.key === undefined ||
            ITEM_.value === null ||
            ITEM_.value === undefined
        ) throw new Error("Array items must be objects that contain valid keys and valid value properties.");

        _Store(storage, ITEM_.key, ITEM_.value);
    })
};