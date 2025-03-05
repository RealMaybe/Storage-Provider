/* 获取本地存储的值 */


import { type RealClassConfigType } from "../tsType/classConfigType"; // 实际使用的类配置类型
import { ValidateKey } from "../parameter/ValidateKey.ts";


/* ========== */


/**
 * 从存储中获取指定键的值
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 *
 * @function GetValueFromStorage
 *
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { string } key 要获取的键名
 *
 * @returns { any } 存储的值，如果没有找到则返回null
 */
export function GetValueFromStorage(
    classConfig: RealClassConfigType<boolean>,
    key: string
): any {
    const KEY_ = ValidateKey(classConfig, key);
    const storedValue = classConfig.storage.getItem(KEY_);

    let result: any; // 结果值

    if (!classConfig.original)
        result = storedValue ? JSON.parse(storedValue) : null;
    else
        result = storedValue;

    return result;
}