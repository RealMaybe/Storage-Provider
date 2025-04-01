/* 设置本地存储的值 */


import { type RealClassConfigType } from "../../scriptType/classConfigType"; // 实际使用的类配置类型
import { ValidateKey } from "../parameter/ValidateKey";
import { ValidateValue } from "../parameter/ValidateValue";


/* ========== */


/**
 * 将数据存储到 web Storage 中
 *
 * @function SetValueToStorage
 *
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { string } key 要存储的键名
 * @param { any } value 要存储的数据
 *
 * @returns { void }
 */
export function SetValueToStorage(
    classConfig: RealClassConfigType<boolean>,
    key: string,
    value: any
): void {
    const KEY_ = ValidateKey(classConfig, key);
    const VALUE_ = ValidateValue(classConfig, value);

    // 存储数据
    classConfig.storage.setItem(KEY_, JSON.stringify(VALUE_));
}