const config = {
    storageType: "local", // 存储类型
};

/**
 * 验证 key 的有效性。
 * @function _key
 * @param { string } key 键名。
 * @returns { string } 返回传入的键。
 * @throws { Error } 如果传入的值为空，将抛出错误。
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误。
 * @throws { Error } 如果键名是空字符串，将抛出错误。
 */
function _Key(key) {
    if (key === undefined || key === null)
        throw new Error("Please pass in valid key.");

    if (typeof key !== "string")
        throw new Error("The data type of the key must be a string.");

    if (typeof key === "string" && key.trim() === "")
        throw new Error("The key cannot be an empty string.");

    return key;
}

/**
 * 用于验证 value 的有效性。
 * @function _Value
 * @param { * } value 存储值。
 * @returns { string } 返回传入的键。
 * @throws { Error } 如果传入的值为空，将抛出错误。
 */
function _Value(value) {
    if (value === undefined || value === null)
        throw new Error("There must be a value for the content that needs to be saved.");

    return value;
}

/**
 * 验证数组有效性。
 * @function _Array
 * @param { Array } arr - 数组。
 * @param { string } type - 需要的数据类型。
 * @returns { Array } - 返回传入的数组。
 * @throws { Error } - 如果输入参数不是数组，将抛出错误。
 * @throws { Error } - 如果数组为空，将抛出错误。
 * @throws { Error } - 如果数组中的所有项不是字符串，将抛出错误。
 */
function _Array(arr, type) {
    if (!Array.isArray(arr))
        throw new Error("Input parameter must be an array.")

    if (arr.length === 0)
        throw new Error("A valid item must exist in the array.")

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== type)
            throw new Error(`All items in the array must be ${type}s.`);
    }

    return arr
}

/**
 * 一个处理非空对象的函数。
 * @function _Object
 * @param { object } obj - 一个非空对象。
 * @returns { object } - 返回一个非空的对象。
 * @throws { error } - 当对象为空或包含无效值时抛出错误。
 * @throws { error } - 当传入的参数不是对象时抛出错误。
 */
function _Object(obj) {
    // obj 必须是一个非空对象，并且不能是数组。 
    // 这是为了确保只有键值对存在于 obj 中，而不是其他类型的数据。
    if (
        obj !== undefined &&
        obj !== null &&
        !Array.isArray(obj) &&
        typeof obj === "object"
    ) {
        const valid = (() => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];

                    if (value !== undefined && value !== null)
                        return true;
                    else
                        return false;
                }
            }
        })();

        if (JSON.stringify(obj) !== "{}" && valid === true)
            return obj;

        throw new Error("Object is empty or there is an invalid value in the object.");
    } else
        throw new Error("Invalid data type: The parameter passed in by this method must be of type object.");
}

/**
 * 从存储中获取指定键的值
 * @function getValueFromStorage
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * @param { Storage } storage - 存储对象
 * @param { string } key - 要获取的键名
 * @returns { * } - 存储的值，如果没有找到则返回null
 */
function getValueFromStorage(storage, key) {
    const KEY_ = _Key(key);

    const storedValue = storage.getItem(KEY_);
    return storedValue ? JSON.parse(storedValue) : null;
}

/**
 * 从存储中获取指定键的值
 * @function getValueFromStorage
 * - 本函数中已经验证了 key 和 value 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * @param { Storage } storage - 存储对象
 * @param { string } key - 要获取的键名
 * @returns { * } - 存储的值，如果没有找到则返回null
 */
function setValueToStorage(storage, key, value) {
    const KEY_ = _Key(key),
        VALUE_ = _Value(value);

    storage.setItem(KEY_, JSON.stringify(VALUE_));
}

/**
 * 从存储中获取值或者设置值
 * @function _Store
 * - 本函数中已经验证了 key 的有效性，不需要再外围再次验证，多次验证可能存在性能问题
 * - 本函数会根据 value 的有效性来进行获取和存储数据
 * @param { Storage } storage - 存储对象，如 localStorage 或 sessionStorage
 * @param { string } key - 键名
 * @param { * } value - 值
 * @returns { void | * } 获取到的值或者无返回值
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误
 */
function _Store(storage, key, value) {
    // value 无效，获取 key 对应的内容
    if (value === undefined || value === null)
        return getValueFromStorage(storage, key);

    // value 有效，设置 key 和 value 值
    else if (value !== undefined && value !== null)
        setValueToStorage(storage, key, value);

    // 其他情况，获取 key 对应的内容
    else
        return getValueFromStorage(storage, key);
}

/**
 * 从存储中获取所有键值对
 * @function _All
 * @param { Storage } storage - 存储对象，如 localStorage 或 sessionStorage
 * @returns { Object } 包含所有键值对的对象
 */
function _All(storage) {
    const allData = {};

    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        const value = getValueFromStorage(storage, key);
        allData[key] = value;
    }

    return allData;
}

/**
 * 用于识别对象中的存储值
 * @function _ObjectValue
 * @param { Storage } storage - 存储对象，如 localStorage 或 sessionStorage
 * @param { object } obj - 存有需要存储的内容的对象
 */
function _ObjectValue(storage, obj) {
    const OBJ_ = _Object(obj);

    for (const key in OBJ_) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            _Store(storage, key, value);
        }
    }
}

/**
 * 用于操作数组中的对象，获取对象中的 key 属性和 value 属性对应的值并保存。
 * @function _ObjectMany
 * @param { storage } storage 
 * @param { array } arr 
 */
function _ObjectMany(storage, arr) {
    arr.forEach(item => {
        const ITEM_ = _Object(item);

        if (!ITEM_.key ||
            !ITEM_.value ||
            ITEM_.key === null ||
            ITEM_.key === undefined ||
            ITEM_.value === null ||
            ITEM_.value === undefined
        ) throw new Error("Array items must be objects that contain valid keys and valid value properties.");

        _Store(storage, ITEM_.key, ITEM_.value);
    });
}

/**
 * 设置单条或多条存储数据。
 * @function _Set
 * @param  { any } arg - 要存储的单条或者多条数据
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 */
function _Set(storage, arg) {
    /* 检查参数数量 */
    if (
        arg.length <= 0 ||
        arg.length > 2
    ) throw new Error("Effective parameters must exist and the number of parameters must not exceed 2");

    /* 检查参数类型 */

    // 参数数量为 1
    if (arg.length === 1) {
        // 参数为数组
        if (Array.isArray(arg[0])) {
            const ARR_ = _Array(arg[0], "object");

            _ObjectMany(storage, ARR_);
        }

        // 参数为对象
        else if (
            typeof arg[0] === "object" &&
            !Array.isArray(arg[0])
        ) {
            const OBJ_ = _Object(arg[0]);

            _ObjectValue(storage, OBJ_);
        }

        // 其他情况
        else throw new Error("If only one parameter is passed in, the type of the parameter must be array or object.")
    }

    // 参数数量为 2
    else if (arg.length === 2) {
        // 第 1 个参数为字符串，且第 2 个参数有效
        // 第 1 个参数为 key
        // 第 2 个参数为 value
        if (
            typeof arg[0] === "string" &&
            arg[1] !== undefined &&
            arg[1] !== null
        ) {
            const KEY_ = _Key(arg[0]),
                VALUE_ = _Value(arg[1]);

            _Store(storage, KEY_, VALUE_);
        }

        // 两个参数存在类型错误
        else throw new Error("If two parameters are passed in, the first parameter must be of type string, and the second parameter must exist and be valid.")
    }
}

/**
 * 删除存储元素
 * @function _Remove
 * @param { storage } storage - 存储对象
 * @param { boolean } - 决定用于删除单个项目还是清空存储
 *     - true 为删除单个
 *     - false 为清空
 * @param { string } key - 键名
 * @returns { void } 无返回值
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误
 */
function _Remove(storage, judge, key) {
    if (
        judge &&
        key !== undefined &&
        key !== null
    ) {
        const KEY_ = _Key(key);
        storage.removeItem(KEY_);
    } else storage.clear();
}

// config

const type = config.storageType;

// method


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
class StorageProvider {
    constructor(storageType = type) {
        if (storageType !== "local" && storageType !== "session")
            throw new Error("Invalid storage type. Must be 'local' or 'session'.");

        // 根据环境和存储类型选择合适的存储对象
        this._storage = (() => {
            // 浏览器环境
            if (window && !window.plus)
                return storageType === "session" ? sessionStorage : localStorage;

            // H5+app 环境
            if (window.plus && window.plus.storage)
                return storageType === "session" ? plus.storage : plus.storage.getStorageSync();

            // 其他情况
            throw new Error("Unknown environment, unable to determine storage method.");
        })();
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
        } catch (error) { console.error(error); }
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

            _Store(this._storage, KEY_, VALUE_);
        } catch (error) { console.error(error); }
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
        } catch (error) { console.error(error); }
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
            _Set(this._storage, arg);
        } catch (error) { console.error(error); }
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
        } catch (error) { console.error(error); }
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
        } catch (error) { console.error(error); }
    }

    /**
     * 从本地存储中获取所有数据。
     * @function GetAll
     * @returns { Object } - 包含所有本地存储数据的对象。
     */
    GetAll() {
        try {
            return _All(this._storage);
        } catch (error) { console.error(error); }
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
            _Remove(this._storage, true, key);
        } catch (error) { console.error(error); }
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

            _Remove(this._storage, true, KEY_);
        } catch (error) { console.error(error); }
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
                _Remove(this._storage, true, key);
            }
        } catch (error) { console.error(error); }
    }

    /**
     * 删除存储的所有数据
     * @function Clean
     * @returns { void } 无返回值
     */
    Clean() {
        try {
            _Remove(this._storage, false);
        } catch (error) { console.error(error); }
    }
}

// config

/* ========== */

const $Storage = new StorageProvider(config.storageType);

export { $Storage, StorageProvider };
