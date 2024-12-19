/* 设置多个元素，通过对象 */

// 导入依赖
import { ValidateObject } from "../validate/ValidateObject.js";
import { SetValueToStorage } from "../value/setValue.js";

/**
 * 用于识别对象中的存储值
 * 
 * @function m_setManyFromObject
 * 
 * @param { object } classConfig 配置对象
 * @param { { [key: string]: any } } obj 存有需要存储的内容的对象
 * 
 * @return { void } 仅设置值，无返回值
 */
export function m_setManyFromObject(classConfig, obj) {
    const OBJ_ = ValidateObject(classConfig, obj);

    // 遍历对象属性
    for (const key in OBJ_) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            SetValueToStorage(classConfig, key, value)
        }
    };
}