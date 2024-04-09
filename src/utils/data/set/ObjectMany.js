import { $Array, $Object } from "../../../methods/Parameter.js";
import { $Store } from "../../../methods/Data.js";

/* ========== */

/**
 * 用于操作数组中的对象，获取对象中的 key 属性和 value 属性对应的值并保存。
 * 
 * @function $ObjectMany
 * 
 * @param { object } config 配置对象
 * @param { array } arr 数组
 * 
 * @throws 抛出报错：数组项必须是包含有效键和有效值属性的对象
 */
export function $ObjectMany(config, arr) {
    const ARR_ = $Array(arr, "object");

    ARR_.forEach(item => {
        const ITEM_ = $Object(config, item);

        if (!ITEM_.key ||
            // !ITEM_.value || // value 是空字符串的话验证不通过
            ITEM_.key === null ||
            ITEM_.key === undefined ||
            ITEM_.value === null ||
            ITEM_.value === undefined
        ) throw new Error("Array items must be objects that contain valid 'key' and valid 'value' properties.");

        $Store(config, ITEM_.key, ITEM_.value);
    })
}