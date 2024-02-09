// method
import {
    _Key,
    _Value,
    _Array,
    _Object,
    _Set
} from "./utils/Parameter.js";

import {
    _Remove
} from "./utils/Delete.js";

import {
    _Store,
    _All,
    _ObjectValue,
    _ObjectMany
} from "./utils/Data.js";


/* ========== */


// var
import { type } from "./var/type.js";


/* ========== */


// function

/**
 * StorageProvider 提供对 localStorage 和 sessionStorage 的操作方法。
 * 仅支持 window 和 window.plus 环境，暂不支持其他环境。
 * @constructor
 * @author RealMaybe
 * @param { string } storageType 用于设置存储类型
 *     - 可选值为 "session" 或 "local"
 *     - 不传值默认为 "local"
 */
export class StorageProvider {
    constructor(storageType = type) {
        if (storageType !== "local" && storageType !== "session")
            throw new Error("Invalid storage type. Must be 'local' or 'session'.");

        // 根据环境和存储类型选择合适的存储对象
        this._storage = (() => {
            // 浏览器环境
            if (window && !window.plus) return storageType === "session" ? sessionStorage : localStorage;

            // H5+app 环境
            if (window.plus && window.plus.storage) return storageType === "session" ? plus.storage : plus.storage.getStorageSync();

            // 其他情况
            throw new Error("Unknown environment, unable to determine storage method.");
        })()
    }

    // set & get

    /**
     * 设置或获取单条存储数据
     * @function Storage
     * @param { string } key - 数据的键名
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
     * @param { string } key - 数据的键名
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

            _ObjectMany(this._storage, ARR_);
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
            const ARG_ = arg;

            _Set(this._storage, ARG_)
        } catch (error) { console.error(error) }
    }

    // get

    /**
     * 获取单条存储数据
     * @function Get
     * @param { string } key - 数据的键名
     * @returns { * } - 返回键的存储值
     */
    Get(key) {
        try {
            return _Store(this._storage, key)
        } catch (error) { console.error(error) }
    }

    /**
     * 从存储中获取多个键对应的值。
     * @function GetMany
     * @param { Array.<string> } arr - 包含需要获取值的键的数组。
     * @returns { Array.<Object> } 包含键值对的对象数组，格式为 [{key1: value1}, {key2: value2}, ...]。
     */
    GetMany(arr) {
        try {
            const ARR_ = _Array(arr, "string");

            let resultArr = [];

            for (let key of ARR_) {
                let value = _Store(this._storage, key),
                    obj = {
                        [key]: value
                    };

                resultArr.push(obj);
            }

            return resultArr;
        } catch (error) { console.error(error) }
    }

    /**
     * 从本地存储中获取所有数据。
     * @function GetAll
     * @returns { Object } - 包含所有本地存储数据的对象。
     */
    GetAll() {
        try {
            return _All(this._storage);
        } catch (error) { console.error(error) }
    }


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * @function Delete
     * @param { string } key - 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
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
     * @param { string } key - 要删除的数据的键名
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

            for (let key of ARR_) {
                _Remove(this._storage, true, key)
            }
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