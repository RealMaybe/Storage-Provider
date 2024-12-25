/* 主方法库，StorageProvider 类 */


// 导入依赖
import { localStorage } from "./var/local.js"; // localStorage 存储器
import { sessionStorage } from "./var/session.js"; // sessionStorage 存储器
import { Settings } from "./settings/Settings.js"; // 配置管理器
import { CheckCircular } from "./checker/checkCircular.js" // 循环引用检查器
import { ValidateObject } from "./validate/ValidateObject.js"; // 验证对象的方法
import { ValidateArray } from "./validate/ValidateArray.js"; // 验证数组的方法
import { ValidateKey } from "./parameter/ValidateKey.js"; // 验证键名的方法 
import { ValidateValue } from "./parameter/ValidateValue.js"; // 验证值的方法
import { m_listener } from "./methods/listener.js" // 监听器
import { m_inspector } from "./methods/inspector.js" // 验证规则的方法
import { m_store } from "./methods/store.js" // 存储、获取值的方法
import { m_setManyFromKeyValue } from "./methods/setManyFromKeyValue.js" // 通过数组中的对象中的 key 和 value 属性批量设置值的方法
import { m_setManyFromObject } from "./methods/setManyFromObject.js"; // 通过对象批量设置值的方法
import { m_setValueMethod } from "./methods/setValueMethod.js"; // 设置单条或多条存储数据
import { m_getMany } from "./methods/getMany.js" // 获取多条存储数据的方法
import { m_getAll } from "./methods/getAll.js" // 获取所有存储数据的方法
import { m_deleteItem } from "./methods/delete.js" // 删除单条或多条存储数据的方法


/* ========== */


/**
 * 配置对象的类型定义
 * @typedef { Object } ConfigType
 * @property { Storage } storage 存储环境
 * @property { string } type 存储类型
 * @property { boolean } warn 是否弹出警告信息
 * @property { boolean } circular 是否去除循环引用
 * @property { boolean } monitor 是否监控存储变化
 * @property { string } prefix 存储项的前缀
 */


/* ========== */


/**
 * StorageProvider 提供对 localStorage 和 sessionStorage 的操作方法。
 * 仅支持 window 环境，暂不支持其他环境。
 * 
 * @class StorageProvider
 * @author RealMaybe <ling0910ai@qq.com>
 * @version 1.1.1
 * @license MIT
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 */
export class StorageProvider {
    /**
     * 私有属性：配置
     * @private
     * @type { ConfigType }
     */
    #config

    /**
     * @constructor StorageProvider
     * @param { string | object } settings 配置对象，可以是字符串或包含配置属性的对象。
     * @param { string } [settings.storageType] 存储类型，必须是 "local" 或 "session"（必填）
     * @param { string } [settings.type] 存储类型，与 storageType 一致，二选一填写即可
     * @param { boolean } [settings.warn] 是否显示警告（必填）
     * @param { boolean } [settings.circular] 是否检查循环引用（可选）
     * @param { number } [settings.maxSize] 最大存储大小（可选）
     * @param { boolean } [settings.monitor] 是否监控存储变化（可选）
     * @param { string } [settings.prefix] 存储项的前缀（可选）
     */
    constructor(settings) {
        // 解构、验证配置参数
        const {
            storageType,
            warn,
            circular,
            monitor,
            channelName,
        } = Settings(settings);

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
            monitor, // 是否监控存储变化
            channel: monitor && typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(channelName) : null, // 频道
        }
    }


    /* ========== */


    // 辅助方法

    /**
     * 去除循环引用的方法
     * 
     * @method Circular 
     * 
     * @param { object | Array<any> } item 要去除循环引用的对象或数组
     * 
     * @return { object | Array<any> } 去除循环引用后的对象或数组
     */
    circular(item) {
        try {
            const { isCircular, warning, value } = CheckCircular(item);

            if (isCircular && this.#config.warn) console.warn(warning);

            return value
        } catch (err) { console.error(err) }
    }

    /**
     * 验证本地存储中指定的项是否满足制定规则的方法
     * 
     * @method inspector 
     * 
     * @param { { [storageKey: string]: string | (item: any) => boolean } } obj 指定的项及其验证规则
     * - 该对象中的每一个属性的键名将作为存储的键名，属性值将作为验证规则；
     * - 验证规则可以是字符串，也可以是一个函数，该函数的返回值必须为布尔值；
     * - 如果是字符串，则检测 Storage 中 storageKey 对应的值的类型是否与该字符串相等；
     * - 如果是函数，则调用该函数，传入 Storage 中 storageKey 对应的值，如果函数返回 true，则验证通过，否则验证失败。
     * 
     * @returns { { all: boolean, tips: { [storageKey: string]: string }, errors: { [storageKey: string]: string } } } 验证结果对象
     * - all: 所有的项目验证是否通过，全部通过为 true，任一不通过为 false；
     * - tips: 验证提示信息；
     * - errors: 验证失败的项目及其对应的错误信息。
     */
    inspector(obj) {
        try {
            return {...m_inspector(this.#config, obj) }
        } catch (err) { console.error(err) }
    }

    /**
     * 发送消息
     *
     * @method sendMsg
     *
     * @param { any } data 需要发送的消息，可以是任意可克隆的类型
     *
     * @returns { void }
     */
    sendMsg(data) {
        try {
            m_listener(this.#config, { message: data })
        } catch (err) { console.error(err) }
    }

    /**
     * 发送消息
     * 此方法会检测传入的消息内容是否有效
     *
     * @method postMsg
     *
     * @param { any } data 需要发送的消息，可以是任意可克隆的类型
     *
     * @returns { void }
     */
    postMsg(data) {
        try {
            m_listener(this.#config, { message: ValidateValue(data) })
        } catch (err) { console.error(err) }
    }

    /**
     * 接收消息
     *
     * @method listenMsg
     *
     * @param { (message: any) => void } callback 回调函数
     * - 回调函数中可以使用 this
     * - this 指向实例化出来的 StorageProvider 对象
     *
     * @returns { void }
     */
    listenMsg(callback) {
        try {
            return m_listener(this.#config, { callback }, this)
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
            return m_store(this.#config, key, value)
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
            m_store(this.#config, key, ValidateValue(this.#config, value))
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
            m_setManyFromKeyValue(this.#config, arr)
        } catch (err) { console.error(err) }
    }

    /**
     * 通过对象批量设置多条存储数据
     * 
     * @method SetMany
     * 
     * @param { { [key: string]: any } } obj 要存储的多条数据，对象中的每个属性的将作为key，属性值将作为存储的值。
     * 
     * @returns { void } 仅设置键的值，无返回值
     */
    setMany(obj) {
        try {
            m_setManyFromObject(this.#config, obj)
        } catch (err) { console.error(err) }
    }

    /**
     * 设置单条或多条存储数据。
     * - 该方法本质上是对 save、saveMany、setMany 的整合，用于简化调用。
     * - 该函数传入参数数量为必须为 1 ~ 2。
     * - 参数的传入原则与 save、saveMany、setMany 三个方法相同。
     *
     * @method Set
     * 
     * @param { Array<{ key: string, value: any }> | { [key: string]: any } | string } data 要存储的单条或多条数据
     * 
     * @returns { void } 仅设置值，无返回值
     */
    set(...data) {
        try {
            m_setValueMethod(this.#config, data)
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
            return m_store(this.#config, key)
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
            return m_getMany(this.#config, arr, type)
        } catch (err) { console.error(err) }
    }

    /**
     * 从本地存储中获取所有数据。
     * 
     * @method GetAll
     * 
     * @returns { { [key: string]: any } } 包含所有本地存储数据的对象。
     */
    getAll() {
        try {
            return m_getAll(this.#config)
        } catch (err) { console.error(err) }
    }


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * 
     * @method Delete
     * 
     * @param { string } [key] 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
     * 
     * @returns { void } 无返回值
     */
    delete(key) {
        try {
            m_deleteItem(this.#config, true, key)
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
            m_deleteItem(this.#config, true, ValidateKey(this.#config, key, `"remove"`))
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
            for (let key of ValidateArray(this.#config, arr, "string"))
                m_deleteItem(this.#config, true, key)
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
            m_deleteItem(this.#config, false)
        } catch (err) { console.error(err) }
    }
}