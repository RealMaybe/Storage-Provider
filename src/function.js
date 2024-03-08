// method
import {
    _Key, // key 有效性验证
    _Value, // value 有效性验证
    _Array, // 数组及内部数据有效性验证
    _Object // 对象及内部数据有效性验证

} from "./utils/Parameter.js";

import {
    _Remove // 删除存储元素
} from "./utils/Delete.js";

import {
    _Store, // 从存储中获取值或者设置值
    _Set, // 设置单条或多条存储数据
    _GetMany, // 从存储中获取多条存储数据
    _All, // 从存储中获取所有键值对
    _ObjectValue, // 用于识别对象中的存储值
    _ObjectMany // 用于操作数组中的对象
} from "./utils/Data.js";

import {
    getStorageSize // 计算 webStorage 中所有数据的总大小
} from "./utils/Helper.js";


/* ========== */


// config
import { _Settings } from "./config/Settings.js";


/* ========== */


// function

/**
 * StorageProvider 提供对 localStorage 和 sessionStorage 的操作方法。
 * 仅支持 window 和 window.plus 环境，暂不支持其他环境。
 * 
 * @constructor
 * @class
 * @name StorageProvider
 * @author RealMaybe
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @param { object } settings 配置对象
 * - 如不传入内容，直接会使用默认配置
 * 
 * @param { String } settings.type 存储类型
 * @param { number } settings.maxSize 存储的最大大小
 * @param { number } settings.expiration 存储的过期时间
 * @param { String } settings.prefix 存储的键的前缀
 */
export class StorageProvider {
    constructor(settings) {
        // 解构配置对象
        const {
            type, // 存储类型
            maxSize, // 存储的最大大小
            // expiration, // 存储的过期时间
            // prefix // 存储的 key 的前缀
        } = _Settings(settings);

        /* ========== */

        // 存储类型验证
        if (type !== "local" && type !== "session")
            throw new Error("Invalid storage type. Must be 'local' or 'session'.");


        /* ========== */


        // 根据环境和存储类型选择合适的存储对象
        this._storage = (() => {
            // 浏览器环境
            if (window && !window.plus)
                return type === "session" ? sessionStorage : localStorage;

            // H5+app 环境
            if (window.plus && window.plus.storage)
                return type === "session" ? plus.storage : plus.storage.getStorageSync();

            // 其他情况
            throw new Error("Unknown environment, unable to determine storage method.");
        })()


        /* ========== */


        // 数据大小验证
        if (getStorageSize(this._storage).b > maxSize)
            throw new Error("There is an excessive amount of data saved, please delete the excess part.");
    }


    /* ========== */


    // set & get

    /**
     * 设置或获取单条存储数据
     * @function Storage
     * @param { String } key - 数据的键名
     * @param { * } value - 要存储的值 (可选)
     * @returns { void | * } - 如果提供了值，则设置键的值；如果没有提供值，则返回键的存储值
     */
    Storage(key, value) {
        try {
            return _Store(this._storage, key, value)
        } catch (error) { console.error(error) }
    }

    // set

    /**
     * 设置单条存储数据
     * @function Save
     * @param { String } key - 数据的键名
     * @param { * } value - 要存储的值
     * @returns { void } 仅设置键的值，无返回值
     */
    Save(key, value) {
        try {
            const KEY_ = _Key(key),
                VALUE_ = _Value(value);

            _Store(this._storage, KEY_, VALUE_)
        } catch (error) { console.error(error) }
    }

    /**
     * 设置多条存储数据
     * @function SaveMany
     * @param { Array<{key: string, value: any}> } arr - 要存储的多条数据，数组中的每个元素都是包含 key 和 value 属性的对象
     * @returns { void } 仅设置键的值，无返回值
     */
    SaveMany(arr) {
        try {
            const ARR_ = _Array(arr, "object");

            _ObjectMany(this._storage, ARR_)
        } catch (error) { console.error(error) }
    }

    /**
     * 设置单条或多条存储数据。
     * @function Set
     * @param  { ...any } arg - 要存储的单条或者多条数据
     * - 该函数传入参数数量为必须为 1 ~ 2。
     * - 参数的传入原则详见说明文档。
     */
    Set(...arg) {
        try {
            _Set(this._storage, arg)
        } catch (error) { console.error(error) }
    }

    // get

    /**
     * 获取单条存储数据
     * @function Get
     * @param { String } key - 数据的键名
     * @returns { * } - 返回键的存储值
     */
    Get(key) {
        try {
            return _Store(this._storage, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 从存储中获取多个键对应的值。
     * - 如关于 type 的具体用法无法理解，请参见说明文档。
     * @function GetMany
     * @param { Array.<string> } arr - 包含需要获取值的键的数组。
     * @param { String } type - 获取值之后的输出类型，可选值为 "array", "object", "array-object"。
     * @returns { Array.<Object> | Object } 
     */
    GetMany(arr, type = "array") {
        try {
            return _GetMany(this._storage, arr, type)
        } catch (error) { console.error(error) }
    }

    /**
     * 从本地存储中获取所有数据。
     * @function GetAll
     * @returns { Object } - 包含所有本地存储数据的对象。
     */
    GetAll() {
        try {
            return _All(this._storage)
        } catch (error) { console.error(error) }
    }


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * @function Delete
     * @param { String } key - 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
     * @returns { void } 无返回值
     */
    Delete(key) {
        try {
            _Remove(this._storage, true, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 删除存储的单条数据
     * @function Remove
     * @param { String } key - 要删除的数据的键名
     * @returns { void } 无返回值
     */
    Remove(key) {
        try {
            const KEY_ = _Key(key);

            _Remove(this._storage, true, KEY_)
        } catch (error) { console.error(error) }
    }

    /**
     * 从本地存储中删除多条数据。
     * @function RemoveMany
     * @param { Array.<string> } arr - 包含需要删除的键的数组。
     * @returns { void } 无返回值
     */
    RemoveMany(arr) {
        try {
            const ARR_ = _Array(arr, "string");

            for (let key of ARR_) _Remove(this._storage, true, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 删除存储的所有数据
     * @function Clean
     * @returns { void } 无返回值
     */
    Clean() {
        try {
            _Remove(this._storage, false)
        } catch (error) { console.error(error) }
    }
};