import { _Store } from "./Store.js";
import { _Object } from "../Parameter.js";

/**
 * 用于识别对象中的存储值
 * @function _ObjectValue
 * @param { Storage } storage - 存储对象，如 localStorage 或 sessionStorage
 * @param { object } obj - 存有需要存储的内容的对象
 */
export function _ObjectValue(storage, obj) {
    const OBJ_ = _Object(obj);

    for (const key in OBJ_) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            _Store(storage, key, value)
        }
    }
}