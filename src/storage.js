"use strict";


/* ========== */


/* 参数方法 */
import {
    $Array, // 数组 有效性验证
} from "./methods/Parameter.js";

/* 数据方法 */
import {
    // delete
    $Delete, // 删除存储元素

    // get
    $GetAll, // 从存储中获取所有键值对
    $GetMany, // 从存储中获取多条存储数据

    // set
    $ObjectMany, // 用于操作数组中的对象
    $Set, // 设置单条或多条存储数据

    // value
    $Store // 从存储中获取值或者设置值
} from "./methods/Data.js";

import {
    _getStorageSize // 本地存储合计大小
} from "./methods/Checker.js";

/* ========== */

/* 配置 */
import { $Settings } from "./settings/Settings.js";

/* ========== */


// function

/**
 * StorageProvider 提供对 localStorage 和 sessionStorage 的操作方法。
 * 仅支持 window 和 window.plus 环境，暂不支持其他环境。
 * 
 * @class
 * @constructor
 * @name StorageProvider
 * @author RealMaybe
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @param { object } settings 配置对象
 * 
 * @param { String } [settings.type] 存储类型
 * @param { number } [settings.maxSize] 存储的最大大小
 * @param { boolean } [settings.warn] 是否在控制台弹出警告信息
 */
export class StorageProvider {
    constructor(settings) {
        // 解构配置对象
        const {
            type, // 存储类型
            maxSize, // 存储的最大大小
            warn // 是否在控制台显示警告信息

            /* 以下几项是定义好的内容，但是现版本暂时不会使用到 */

            // expiration, // 存储是否过期
            // time, // 存储的过期时间
            // prefix, // 存储的 key 的前缀
        } = $Settings(settings);


        /* ========== */

        // 存储类型验证
        if (type !== "local" && type !== "session")
            throw new Error("Invalid storage type. Must be 'local' or 'session'.");

        /* ========== */

        // 创建配置对象
        this._config = {
            type, // 文本提示
            storage: (() => { // 存储环境
                // 浏览器环境
                if (window && !window.plus)
                    return type === "session" ? sessionStorage : localStorage;

                // H5+app 环境
                if (window.plus && window.plus.storage)
                    return type === "session" ? plus.storage : plus.storage.getStorageSync;

                // 其他环境
                throw new Error("Unknown environment, unable to determine storage method.")
            })(),
            warn, // 警告
        }

        /* ========== */

        // 数据大小验证
        if (_getStorageSize(this._config).b > maxSize && maxSize <= 5242880)
            throw new Error("The amount of saved data is too large, please delete the excess parts. Alternatively, you can modify the maximum storage value (maxSize) in the configuration object, which has a maximum limit of 5,242,880 bytes.")
    }


    /* ========== */


    // set & get value

    /**
     * 设置或获取单条存储数据
     * @method Storage
     * @param { String } key 数据的键名
     * @param { * } value 要存储的值 (可选)
     * @returns { void | * } 如果提供了值，则设置键的值；如果没有提供值，则返回键的存储值
     */
    Storage(key, value) {
        try {
            return $Store(this._config, key, value)
        } catch (error) { console.error(error) }
    }


    /* ========== */


    // set

    /**
     * 设置单条存储数据
     * @method Save
     * @param { String } key 数据的键名
     * @param { * } value 要存储的值
     * @returns { void } 仅设置键的值，无返回值
     */
    Save(key, value) {
        try {
            $Store(this._config, key, value)
        } catch (error) { console.error(error) }
    }

    /**
     * 设置多条存储数据
     * @method SaveMany
     * @param { Array<{key: string, value: any}> } arr 要存储的多条数据，数组中的每个元素都是包含 key 和 value 属性的对象
     * @returns { void } 仅设置键的值，无返回值
     */
    SaveMany(arr) {
        try {
            $ObjectMany(this._config, arr)
        } catch (error) { console.error(error) }
    }

    /**
     * 设置单条或多条存储数据。
     * - 该函数传入参数数量为必须为 1 ~ 2。
     * - 参数的传入原则详见说明文档。
     * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
     *
     * @method Set
     * @param  { ...* } arg 要存储的单条或者多条数据
     */
    Set(...arg) {
        try {
            $Set(this._config, arg)
        } catch (error) { console.error(error) }
    }


    /* ========== */


    // get

    /**
     * 获取单条存储数据
     * @method Get
     * @param { String } key 数据的键名
     * @returns { * } 返回键的存储值
     */
    Get(key) {
        try {
            return $Store(this._config, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 从存储中获取多个键对应的值。
     * - 如关于 type 的具体用法无法理解，请参见说明文档。
     * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
     * 
     * @method GetMany
     * @param { Array<string> } arr 包含需要获取值的键的数组。
     * @param { String } type 获取值之后的输出类型，可选值为 "array", "object", "array-object"。
     * @returns { Array<Object> | Object } 
     */
    GetMany(arr, type = "array") {
        try {
            return $GetMany(this._config, arr, type)
        } catch (error) { console.error(error) }
    }

    /**
     * 从本地存储中获取所有数据。
     * @method GetAll
     * @returns { Object } 包含所有本地存储数据的对象。
     */
    GetAll() {
        try {
            return $GetAll(this._config)
        } catch (error) { console.error(error) }
    }


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * @method Delete
     * @param { String } key 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
     * @returns { void } 无返回值
     */
    Delete(key) {
        try {
            $Delete(this._config, true, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 删除存储的单条数据
     * @method Remove
     * @param { String } key 要删除的数据的键名
     * @returns { void } 无返回值
     */
    Remove(key) {
        try {
            $Delete(this._config, true, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 从本地存储中删除多条数据。
     * @method RemoveMany
     * @param { Array<string> } arr 包含需要删除的键的数组。
     * @returns { void } 无返回值
     */
    RemoveMany(arr) {
        try {
            const ARR_ = $Array(arr, "string");

            for (let key of ARR_) $Delete(this._config, true, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 删除存储的所有数据
     * @method Clean
     * @returns { void } 无返回值
     */
    Clean() {
        try {
            $Delete(this._config, false)
        } catch (error) { console.error(error) }
    }
}