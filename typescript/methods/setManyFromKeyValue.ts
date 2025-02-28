/* 设置多个元素，通过对象中的 key 和 value 属性 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { ValidateArray } from "../validate/ValidateArray";
import { ValidateObject } from "../validate/ValidateObject";
import { SetValueToStorage } from "../value/setValue";

/**
 * 用于操作数组中的对象，获取对象中的 key 属性和 value 属性对应的值并保存。
 * 
 * @function m_setManyFromKeyValue
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * @param { Array<{ key: string, value: any }> } arr 数组
 * 
 * @returns { void } 仅设置值，无返回值
 * 
 * @throws 抛出报错：数组项必须是包含有效键和有效值属性的对象
 */
export function m_setManyFromKeyValue(
    classConfig: TypeClassConfig,
    arr: Array<{ key: string, value: any }>
): void {
    const ARR_: Array<{ key: string, value: any }> = ValidateArray(classConfig, arr, "object");

    ARR_.forEach((item: { key: string, value: any }) => {
        const ITEM_: { key: string, value: any } = ValidateObject(classConfig, item);

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