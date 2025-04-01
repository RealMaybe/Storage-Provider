/* 设置多个元素，通过对象中的 key 和 value 属性 */


import { type RealClassConfigType } from "../../scriptType/classConfigType";
import { ValidateArray } from "../validate/ValidateArray";
import { ValidateObject } from "../validate/ValidateObject";
import { SetValueToStorage } from "../value/setValue";
import { isInvalid } from "../../type/checkType";


/* ========== */


/**
 * 用于操作数组中的对象，获取对象中的 key 属性和 value 属性对应的值并保存。
 * 
 * @function m_setManyFromKeyValue
 * 
 * @param { object } classConfig 配置对象
 * @param { Array<{ key: string, value: any }> } arr 数组
 * 
 * @returns { void } 仅设置值，无返回值
 * 
 * @throws 抛出报错：数组项必须是包含有效键和有效值属性的对象
 */
export function m_setManyFromKeyValue(
    classConfig: RealClassConfigType<boolean>,
    arr: Array<{ key: string, value: any }>
): void {
    const ARR_ = ValidateArray<"object">(classConfig, arr, { type: "object" });

    ARR_.forEach(item => {
        const ITEM_ = ValidateObject(classConfig, item);

        if (isInvalid(ITEM_.key) ||
            isInvalid(ITEM_.value)
        ) throw new TypeError(`Array items must be objects that contain valid "key" and valid "value" properties.`);

        else SetValueToStorage(classConfig, ITEM_.key, ITEM_.value);
    })
}