/* 主方法库，StorageProvider 类 */

"use strict";

// 导入依赖
import { localStorage } from "./var/local.js"; // localStorage 存储器
import { sessionStorage } from "./var/session.js"; // sessionStorage 存储器
import { Settings } from "./settings/Settings.js"; // 配置管理器
import { CheckCircular } from "./checker/checkCircular.js" // 循环引用检查器
import { ValidateArray } from "./validate/ValidateArray.js"; // 验证数组的方法
import { ValidateKey } from "./parameter/ValidateKey.js"; // 验证键名的方法
import { m_store } from "./methods/store.js" // 存储、获取值的方法
import { m_setManyFromKeyValue } from "./methods/setManyFromKeyValue.js" // 通过数组中的对象中的 key 和 value 属性批量设置值的方法
import { m_setManyFromObject } from "./methods/setManyFromObject.js"; // 通过对象批量设置值的方法
import { m_setValueMethod } from "./methods/setValueMethod.js"; // 设置单条或多条存储数据
import { m_getMany } from "./methods/getMany.js" // 获取多条存储数据的方法
import { m_getAll } from "./methods/getAll.js" // 获取所有存储数据的方法
import { m_deleteItem } from "./methods/delete.js" // 删除单条或多条存储数据的方法

/**
 * StorageProvider 提供对 localStorage 和 sessionStorage 的操作方法。
 * 仅支持 window 环境，暂不支持其他环境。
 * 
 * @class StorageProvider
 * @author RealMaybe
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @param { string | { storageType: string, maxSize?: number, warn: boolean, circular?: boolean } } settings 配置对象或存储类型字符串
 * @param { string } [settings.storageType] 存储类型，必填
 * - "local": 使用 localStorage 存储数据。
 * - "session": 使用 sessionStorage 存储数据。
 * - 如果 `settings` 是字符串，则直接视为 `storageType` 的值。
 * @param { number } [settings.maxSize] 最大存储容量，非必填，默认为 1048576 字节，即 1MB
 * @param { boolean } [settings.warn] 是否在控制台弹出警告信息，必填，默认为 true
 * @param { boolean } [settings.circular] 是否去除循环引用，非必填，默认为 false
 */
export class StorageProvider {
    constructor(settings) {
        // 解构、验证配置参数
        const { storageType, warn, circular } = Settings(settings);

        // 建立配置对象
        this._config = {
            storage: (() => { // 存储环境
                // 浏览器环境
                if (globalThis === window)
                    return storageType === "session" ? sessionStorage : localStorage;

                // 其他环境
                if (globalThis !== window)
                    throw new Error("Unknown environment, unable to determine storage method.");
            })(),
            warn,
            circular
        };
    }

    /* ========== */

    // 辅助方法，去除循环引用

    /**
     * @method Circular 去除循环引用的方法
     * 
     * @param { object | Array<any> } item 要去除循环引用的对象或数组
     * 
     * @return { object | Array<any> } 去除循环引用后的对象或数组
     */
    circular(item) {
        try {
            const { isCircular, warning, value } = CheckCircular(item);

            if (isCircular && this._config.warn) console.warn(warning);

            return value
        } catch (err) { console.error(err) }
    }

    /* ========== */

    // 存储或获取

    /**
     * 存储或获取数据
     * 
     * @method Storage
     * 
     * @param { string } key 存储的键名，或用于获取值的键名
     * @param { any } [value] 存储的值，如果没有传入，则视为获取值
     * 
     * @returns { void | any } 
     * - 如果没有传入有效的 `value`，则返回对应键名的值；
     * - 否则，存储对应键名的值并返回 `undefined`。
     */
    storage(key, value) {
        try {
            return m_store(this._config, key, value)
        } catch (err) { console.error(err) }
    }

    /* ========== */

    // 存储

    /**
     * 设置单条存储数据
     * @method Save
     * 
     * @param { string } key 数据的键名
     * @param { any } value 要存储的值
     * 
     * @returns { void } 仅设置键的值，无返回值
     */
    save(key, value) {
        try {
            m_store(this._config, key, value)
        } catch (err) { console.error(err) }
    }

    /**
     * 通过数组中的对象中的 key 和 value 属性批量设置多条存储数据
     * 
     * @method SaveMany
     * 
     * @param { Array<{key: string, value: any}> } arr 要存储的多条数据，数组中的每个元素都是包含 key 和 value 属性的对象
     * 
     * @returns { void } 仅设置键的值，无返回值
     */
    saveMany(arr) {
        try {
            m_setManyFromKeyValue(this._config, arr)
        } catch (err) { console.error(err) }
    }

    /**
     * 通过对象批量设置多条存储数据
     * 
     * @method SetMany
     * 
     * @param { { [key: string]: any } } obj 要存储的多条数据，对象中的每个属性都是键值对
     * 
     * @returns { void } 仅设置键的值，无返回值
     */
    setMany(obj) {
        try {
            m_setManyFromObject(this._config, obj)
        } catch (err) { console.error(err) }
    }

    /**
     * 设置单条或多条存储数据。
     * - 该方法本质上是对 Save、SaveMany、SetMany 的整合，用于简化调用。
     * - 该函数传入参数数量为必须为 1 ~ 2。
     * - 参数的传入原则与 Save、SaveMany、SetMany 三个方法相同。
     *
     * @method Set
     * 
     * @param { { [key: string]: any } | Array<{ key: string, value: any }> | string } data 要存储的单条或多条数据
     * 
     * @returns { void } 仅设置值，无返回值
     */
    set(...data) {
        try {
            m_setValueMethod(this._config, data)
        } catch (err) { console.error(err) }
    }

    /* ========== */

    // 获取

    /**
     * 获取单条存储数据
     * 
     * @method Get
     * 
     * @param { string } key 数据的键名
     * 
     * @returns { any } 返回键的存储值
     */
    get(key) {
        try {
            return m_store(this._config, key)
        } catch (err) { console.error(err) }
    }

    /**
     * 从存储中获取多个键对应的值。
     * - 如关于 type 的具体用法无法理解，请参见说明文档。
     * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
     * 
     * @method GetMany
     * 
     * @param { Array<string> } arr 包含需要获取值的键的数组。
     * @param { string } [type = "object"] 获取值之后的输出类型，可选值为 "array", "object", "array-object"。
     * 
     * @returns { Array<object> | object } 返回包含键值对的数组或对象，具体形式由 type 参数决定。
     */
    getMany(arr, type = "object") {
        try {
            return m_getMany(this._config, arr, type)
        } catch (err) { console.error(err) }
    }

    /**
     * 从本地存储中获取所有数据。
     * 
     * @method GetAll
     * 
     * @returns { object } 包含所有本地存储数据的对象。
     */
    getAll() {
        try {
            return m_getAll(this._config)
        } catch (err) { console.error(err) }
    }


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * 
     * @method Delete
     * 
     * @param { string } key 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
     * 
     * @returns { void } 无返回值
     */
    delete(key) {
        try {
            m_deleteItem(this._config, true, key)
        } catch (err) { console.error(err) }
    }

    /**
     * 删除存储的单条数据
     * 
     * @method Remove
     * 
     * @param { string } key 要删除的数据的键名
     * 
     * @returns { void } 无返回值
     */
    remove(key) {
        try {
            m_deleteItem(this._config, true, ValidateKey(this._config, key))
        } catch (err) { console.error(err) }
    }

    /**
     * 从本地存储中删除多条数据。
     * 
     * @method RemoveMany
     * 
     * @param { Array<string> } arr 包含需要删除的键的数组。
     * 
     * @returns { void } 无返回值
     */
    removeMany(arr) {
        try {
            for (let key of ValidateArray(this._config, arr, "string"))
                m_deleteItem(this._config, true, key)
        } catch (err) { console.error(err) }
    }

    /**
     * 删除存储的所有数据
     * 
     * @method Clean
     * 
     * @returns { void } 无返回值
     */
    clean() {
        try {
            m_deleteItem(this._config, false)
        } catch (err) { console.error(err) }
    }
}