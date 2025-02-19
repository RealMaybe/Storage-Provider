/* 设置本地存储的值 */

// 导入依赖
import { ValidateKey } from "../parameter/ValidateKey.js";
import { ValidateValue } from "../parameter/ValidateValue.js";

/**
 * 将数据存储到 web Storage 中
 *
 * @function SetValueToStorage
 *
 * @param { { storage: Storage, warn: boolean } } classConfig 配置对象
 * @param { string } key 要存储的键名
 * @param { any } value 要存储的数据
 *
 * @returns { void }
 */
export function SetValueToStorage(classConfig, key, value) {
    const KEY_ = ValidateKey(classConfig, key);
    const VALUE_ = ValidateValue(classConfig, value);

    // 存储数据
    classConfig.storage.setItem(KEY_, JSON.stringify(VALUE_));
}