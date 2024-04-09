import { $Store } from "../../../methods/Data.js";
import { $Object } from "../../../methods/Parameter.js";

/* ========== */

/**
 * 用于识别对象中的存储值
 * 
 * @function $ObjectValue
 * 
 * @param { object } config 配置对象
 * @param { object } obj 存有需要存储的内容的对象
 */
export function $ObjectValue(config, obj) {
    const OBJ_ = $Object(config, obj);

    for (const key in OBJ_)
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            $Store(config, key, value)
        }
}