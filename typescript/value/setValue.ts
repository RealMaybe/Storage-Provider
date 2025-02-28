/* 设置本地存储的值 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { ValidateKey } from "../parameter/ValidateKey";
import { ValidateValue } from "../parameter/ValidateValue";

/**
 * 将数据存储到 web Storage 中
 * 
 * @function SetValueToStorage
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * @param { string } key 要存储的键名
 * @param { any } value 要存储的数据
 * 
 * @returns { void }
 */
export function SetValueToStorage(classConfig: TypeClassConfig, key: string, value: any): void {
    const KEY_ = ValidateKey(classConfig, key);
    const VALUE_ = ValidateValue(classConfig, value);

    // 存储数据
    classConfig.storage.setItem(KEY_, JSON.stringify(VALUE_));
}