/* 设置多个元素，通过对象中的 key 和 value 属性 */

// 导入依赖
import { ValidateArray } from "../validate/ValidateArray.js";
import { ValidateObject } from "../validate/ValidateObject.js";
import { SetValueToStorage } from "../value/setValue.js";

/**
 * 用于操作数组中的对象，获取对象中的 key 属性和 value 属性对应的值并保存。
 * 
 * @function m_setManyFromKeyValue
 * 
 * @param { object } classConfig 配置对象
 * @param { Array<{ key: string, value: any }> } arr 数组
 * 
 * @throws 抛出报错：数组项必须是包含有效键和有效值属性的对象
 */
export function m_setManyFromKeyValue(classConfig, arr) {
    const ARR_ = ValidateArray(classConfig, arr, "object");

    ARR_.forEach(item => {
        const ITEM_ = ValidateObject(classConfig, item);

        if (!ITEM_.key ||
            ITEM_.key === null ||
            ITEM_.key === void 0 ||
            !ITEM_.value ||
            ITEM_.value === null ||
            ITEM_.value === void 0
        ) throw new Error(`Array items must be objects that contain valid "key" and valid "value" properties.`);

        else SetValueToStorage(classConfig, ITEM_.key, ITEM_.value);
    })
}