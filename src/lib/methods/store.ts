/* 获取或设置值 */


import { type RealClassConfigType } from "../../scriptType/classConfigType";
import { GetValueFromStorage } from "../value/getValue";
import { SetValueToStorage } from "../value/setValue";
import { isInvalid } from "../../typeChecker";


/* ========== */


/**
 * 从存储中获取值或者设置值
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * - 本函数会根据 value 的有效性来进行获取和存储数据
 * 
 * @function m_store
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { string } key 要获取的元素的键名
 * @returns { any } 获取到的值
 */
export function m_store(classConfig: RealClassConfigType<boolean>, key: string): any;

/**
 * 从存储中获取值或者设置值
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * - 本函数会根据 value 的有效性来进行获取和存储数据
 * 
 * @function m_store
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { string } key 需要设置的键名
 * @param { any } value 需要设置的值
 * @returns { void } 无返回值
 */
export function m_store(classConfig: RealClassConfigType<boolean>, key: string, value: any): void;


/* ========== */


export function m_store(
    classConfig: RealClassConfigType<boolean>,
    key: string,
    value?: any
): any | void {
    // 如果 value 无效，则获取 key 对应的内容
    if (isInvalid(value))
        return GetValueFromStorage(classConfig, key);

    // 如果 value 有效，则设置 key 和 value 值
    SetValueToStorage(classConfig, key, value);
};