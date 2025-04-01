/* 删除存储的内容 */


import { type RealClassConfigType } from "../../scriptType/classConfigType";
import { ValidateKey } from "../parameter/ValidateKey"; // 导入 key 验证器
import { isBoolean, isString, isInvalid } from "../../type/checkType";
import { GetValueFromStorage } from "../value/getValue"; // 导入获取存储内容的函数


/* ========== */


/**
 * 删除存储元素。
 * 
 * @function m_deleteItem
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { true } judge 决定用于删除单个项目还是清空存储
 * - true 删除单个
 * - false 清空
 * @param { string } key 要删除的存储项目的键名
 * @return { void } 无返回值
 * @warning 如果传入的 key 对应的值不存在或者无效，则发出警告
 */
export function m_deleteItem(classConfig: RealClassConfigType<boolean>, judge: true, key: string): void;

/**
 * 删除存储元素。
 * 
 * @function m_deleteItem
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { false } judge 决定用于删除单个项目还是清空存储
 * - true 删除单个
 * - false 清空
 * @return { void } 无返回值
 */
export function m_deleteItem(classConfig: RealClassConfigType<boolean>, judge: false): void;


/* ========== */


export function m_deleteItem(
    classConfig: RealClassConfigType<boolean>,
    judge: boolean,
    key?: string
): void {
    if (isBoolean(judge) && judge) {
        if (!isString(key))
            throw new Error("When judge is true, key must be provided and be a string.");

        const validatedKey = ValidateKey(classConfig, key);

        // 检查键是否存在并验证其有效性
        if (isInvalid(GetValueFromStorage(classConfig, validatedKey)) &&
            classConfig.warn
        ) console.warn(`Warning:\n- Trying to delete a non-existent key from ${classConfig.type}Storage.\n- The key you want to delete is "${validatedKey}".`);

        // 删除键
        classConfig.storage.removeItem(validatedKey);
    }

    // 清空存储
    else classConfig.storage.clear();
};