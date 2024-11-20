/* 删除存储的内容 */

// 导入依赖
import { ValidateKey } from "../parameter/ValidateKey.js"; // 导入 key 验证器
import { GetValueFromStorage } from "../value/getValue.js"; // 导入获取存储内容的函数

/**
 * 删除存储元素。
 * 
 * @function m_deleteItem
 * 
 * @param { { storage: Storage, warn: boolean } } classConfig 配置对象
 * @param { boolean } judge 决定用于删除单个项目还是清空存储
 * - true 删除单个
 * - false 清空
 * @param { string } key 要删除的存储项目的键名
 * 
 * @return { void } 无返回值
 * 
 * @warning 如果传入的 key 对应的值不存在或者无效，则发出警告
 */
export function m_deleteItem(classConfig, judge, key) {
    if (judge && key) {
        const KEY_ = ValidateKey(classConfig, key);

        // 对传入的需要删除的 key 是否有对应值进行验证，如果不存在或者无效，则发出警告
        if (!GetValueFromStorage(classConfig, KEY_) && classConfig.warn)
            console.warn(`Warning:\n- Trying to delete a non-existent key from ${classConfig.type}Storage.\n- The key you want to delete is [${KEY_}].`);

        classConfig.storage.removeItem(KEY_)
    } else if (!judge) classConfig.storage.clear()
};