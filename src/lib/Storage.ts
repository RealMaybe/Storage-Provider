/* 主方法库，StorageProvider 类 */


import {
    type RealClassConfigType, // 真实的类配置类型
    type UserOptionsType // 用户传入的配置类型
} from "../scriptType/classConfigType";
import { type CircularItem } from "../scriptType/circularType"; // 循环引用类型

import { localStorage } from "./var/local"; // localStorage 存储器
import { sessionStorage } from "./var/session"; // sessionStorage 存储器
import { isString, isEffective } from "../type/checkType"; // 类型检查器

import { Settings } from "./settings/Settings"; // 配置管理器
import { CheckCircular } from "./checker/checkCircular"; // 循环引用检查器
import { ValidateArray } from "./validate/ValidateArray"; // 验证数组的方法
import { ValidateKey } from "./parameter/ValidateKey"; // 验证键名的方法 
import { ValidateValue } from "./parameter/ValidateValue"; // 验证值的方法

import { m_rewrite } from "./methods/rewrite"; // 重写值的方法
import { m_listener } from "./methods/listener"; // 监听器
import { m_inspector, type $inspector } from "./methods/inspector"; // 验证规则的方法
import { m_store } from "./methods/store"; // 存储、获取值的方法
import { m_setManyFromKeyValue } from "./methods/setManyFromKeyValue"; // 通过数组中的对象中的 key 和 value 属性批量设置值的方法
import { m_setManyFromObject } from "./methods/setManyFromObject"; // 通过对象批量设置值的方法
import { m_setValueMethod } from "./methods/setValueMethod"; // 设置单条或多条存储数据
import { m_getMany, type OutputType, type OutputResult } from "./methods/getMany"; // 获取多条存储数据的方法
import { m_getAll } from "./methods/getAll"; // 获取所有存储数据的方法
import { m_deleteItem } from "./methods/delete"; // 删除单条或多条存储数据的方法


/* ========== */


/**
 * StorageProvider 类
 */
export class StorageProvider {
    /**
     * 私有属性：配置
     * @private
     * @type { RealClassConfigType<boolean> } 类配置对象
     */
    #config: RealClassConfigType<boolean>; // 配置

    /**
     * @constructor StorageProvider
     * @param { string | object } options 配置对象，可以是字符串或包含配置属性的对象。
     * @param { string } [options.storageType] 存储类型，必须是 "local" 或 "session"（必填）
     * @param { string } [options.type] 存储类型，与 storageType 一致，二选一填写即可
     * @param { boolean } [options.warn] 是否显示警告（必填）
     * @param { boolean } [options.circular] 是否检查循环引用（可选）
     * @param { boolean } [options.original] 是否输出原始值（可选）
     * @param { boolean } [options.monitor] 是否监控存储变化（可选）
     * @param { string } [options.channelName] 通讯频道的名称，需要配合 monitor 使用（可选）
     * @param { string } [options.prefix] 存储项的前缀（可选，未启用）
     * @param { number } [options.maxSize] 最大存储大小（可选，未启用）
     */
    constructor(options: UserOptionsType) {
        // 解构、验证配置参数
        const {
            storageType,
            warn,
            circular,
            original,
            monitor,
            channelName,
        } = Settings(options);

        /* ========== */

        // 建立配置对象
        this.#config = {
            storage: (() => { // 存储环境
                // 浏览器环境
                if (window && globalThis === window)
                    return storageType === "session" ? sessionStorage : localStorage;

                // 其他环境
                else throw new Error("Unknown environment, unable to determine storage method.");
            })(),
            type: storageType, // 存储类型
            warn, // 是否弹出警告信息
            circular, // 是否去除循环引用
            original, // 是否输出原始值
            monitor, // 是否监控存储变化
            channel: monitor && isEffective(typeof BroadcastChannel) ? new BroadcastChannel(channelName) : null, // 频道
        }
    };


    /* ========== */


    // 辅助方法

    /**
     * 去除循环引用的方法
     * 
     * @method circular 
     * @param { object | Array<any> } item 要去除循环引用的对象或数组
     * @return { object | Array<any> } 去除循环引用后的对象或数组
     */
    circular(item: CircularItem): CircularItem {
        const { isCircular, warning, value } = CheckCircular(this.#config, item);

        if (isCircular && this.#config.warn) console.warn(warning);

        return value
    };

    /**
    * 验证本地存储中指定的项是否满足制定规则的方法
    * 
    * @method inspector 
    * @param { { [storageKey: string]: string | (item: any) => boolean } } obj 指定的项及其验证规则
    * - 该对象中的每一个属性的键名将作为存储的键名，属性值将作为验证规则；
    * - 验证规则可以是字符串，也可以是一个函数，该函数的返回值必须为布尔值；
    * - 如果是字符串，则检测 Storage 中 storageKey 对应的值的类型是否与该字符串相等；
    * - 如果是函数，则调用该函数，传入 Storage 中 storageKey 对应的值，如果函数返回 true，则验证通过，否则验证失败。
    * @returns { $inspector } 验证结果对象
    * - all: 所有的项目验证是否通过，全部通过为 true，任一不通过为 false；
    * - tips: 验证提示信息；
    * - errors: 验证失败的项目及其对应的错误信息。
    */
    inspector(obj: {
        [storageKey: string]: string | ((item: any) => boolean)
    }): $inspector {
        return { ...m_inspector(this.#config, obj) }
    };


    /* ========== */


    /* 监听方法 */

    /**
     * 用于发送消息
     *
     * @method sendMsg
     * @param { any } data 需要发送的消息，可以是任意可克隆的类型
     * @returns { void }
     */
    sendMsg(data: any): void {
        m_listener(this.#config, {
            message: data
        })
    };

    /**
     * 发送消息
     * 此方法会检测传入的消息内容是否有效
     *
     * @method postMsg
     * @param { any } data 需要发送的消息，可以是任意可克隆的类型
     * @returns { void }
     */
    postMsg(data: any): void {
        m_listener(this.#config, {
            message: ValidateValue(this.#config, data)
        })
    };

    /**
     * 用于接收消息
     *
     * @method listenMsg
     * @param { (message: any) => void } callback 回调函数
     * - 回调函数中可以使用 this
     * - this 指向实例化出来的 StorageProvider 对象
     * @returns { (close?: boolean) => void }
     */
    listenMsg(callback: (message: any) => void): (close?: boolean) => void {
        return m_listener(this.#config, {
            callback
        }, this)
    };


    /* ========== */


    // 存储或获取

    /**
     * 存储或获取数据
     *
     * @method storage
     * @param { string } key 存储的键名，或用于获取值的键名
     * @param { any } [value] 存储的值，如果没有传入，则视为获取值
     * @returns { void | any } 
     * - 如果没有传入有效的 `value`，则返回对应键名的值；
     * - 否则，存储对应键名的值并返回 `undefined`。
     */
    storage(
        key: string,
        value?: any
    ): void | any {
        return m_store(this.#config, key, value)
    };

    /**
     * 用于重写本地存储中的数据。
     * - 该方法从本地存储中获取数据并传递给回调函数，回调函数返回新的数据对象，然后将新的数据对象写回本地存储。
     * - 须要确保回调函数返回的对象与原始数据对象具有相同的键。
     *
     * @method rewrite
     * @param { string | Array<string> } keys 数据
     * @param { (items: { [storageKey: string]: any }) => { [storageKey: string]: any } } callback 回调函数
     * @returns { void } 
     */
    rewrite(
        keys: string | Array<string>,
        callback: (items: {
            [storageKey: string]: any
        }) => ({
            [storageKey: string]: any
        })
    ): void {
        m_rewrite(this.#config, keys, callback, this)
    };


    /* ========== */


    // 存储

    /**
     * 设置单条存储数据
     *
     * @method save
     * @param { string } key 数据的键名
     * @param { any } value 要存储的值
     * @returns { void } 仅设置键的值，无返回值
     */
    save(
        key: string,
        value: any
    ): void {
        m_store(this.#config, key, ValidateValue(this.#config, value))
    };

    /**
     * 通过数组中的对象中的 key 和 value 属性批量设置多条存储数据
     * 
     * @method SaveMany
     * @param { Array<{key: string, value: any}> } arr 要存储的多条数据，数组中的每个元素都是包含 key 和 value 属性的对象
     * @returns { void } 仅设置键的值，无返回值
     */
    saveMany(arr: Array<{ key: string, value: any }>): void {
        m_setManyFromKeyValue(this.#config, arr)
    };

    /**
     * 通过对象批量设置多条存储数据
     * 
     * @method setMany
     * @param { { [key: string]: any } } obj 要存储的多条数据，对象中的每个属性的将作为key，属性值将作为存储的值。
     * @returns { void } 仅设置键的值，无返回值
     */
    setMany(obj: { [key: string]: any }): void {
        m_setManyFromObject(this.#config, obj)
    };

    /**
     * 设置单条或多条存储数据。
     * - 该方法本质上是对 save、saveMany、setMany 的整合，用于简化调用。
     * - 该函数传入参数数量为必须为 1 ~ 2。
     * - 参数的传入原则与 save、saveMany、setMany 三个方法相同。
     *
     * @method set
     * @param { Array<{ key: string, value: any }> | { [key: string]: any } | string } data 要存储的单条或多条数据
     * @returns { void } 仅设置值，无返回值
     */
    set(...data: Array<{ key: string, value: any }> | [{ [key: string]: any }] | [string, any]): void {
        m_setValueMethod(this.#config, data)
    };


    /* ========== */


    // 获取

    /**
     * 获取单条存储数据
     * 
     * @method get
     * @param { string } key 数据的键名
     * @returns { any } 返回键的存储值
     */
    get(key: string): any {
        return m_store(this.#config, key)
    };

    /**
     * 从存储中获取多个键对应的值。
     * - 如关于 type 的具体用法无法理解，请参见说明文档。
     * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
     * 
     * @method getMany
     * @param { Array<string> } arr 包含需要获取值的键的数组。
     * @param { "array" | "object" | "array-object" } [type = "object"] 获取值之后的输出类型，可选值为 "array", "object", "array-object"。
     * @returns { Array<{ [key: string]: any }> | { [key: string]: any } | Array<{ key: string, value: any }> } 返回包含键值对的数组或对象，具体形式由 type 参数决定。
     */
    getMany<K extends string>(
        arr: Array<K>,
        type: OutputType = "object"
    ): OutputResult<K, typeof type> {
        return m_getMany(this.#config, arr, "object") as OutputResult<K, "object">;
    };

    /**
     * 从本地存储中获取所有数据。
     * 
     * @method getAll
     * @returns { { [storageKey: string]: any } } 包含所有本地存储数据的对象。
     */
    getAll(): { [storageKey: string]: any } {
        return m_getAll(this.#config)
    };


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * 
     * @method delete
     * @param { string | null } [key] 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
     * @returns { void } 无返回值
     */
    delete(key: string | null): void {
        if (isString(key))
            m_deleteItem(this.#config, true, key);
        else
            m_deleteItem(this.#config, false)
    };

    /**
     * 删除存储的单条数据
     * 
     * @method remove
     * @param { string } key 要删除的数据的键名
     * @returns { void } 无返回值
     */
    remove(key: string): void {
        m_deleteItem(this.#config, true, ValidateKey(this.#config, key, "remove"))
    };

    /**
     * 从本地存储中删除多条数据。
     * 
     * @method removeMany
     * @param { Array<string> } arr 包含需要删除的键的数组。
     * @returns { void } 无返回值
     */
    removeMany(arr: Array<string>): void {
        for (let key of ValidateArray<"string">(this.#config, arr, {
            type: "string"
        })) m_deleteItem(this.#config, true, key)
    };

    /**
     * 删除存储的所有数据
     * 
     * @method clean
     * @returns { void } 无返回值
     */
    clean(): void {
        m_deleteItem(this.#config, false)
    };
};