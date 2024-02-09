import {
    _Key,
    _Value,
    _Array,
    _Object
} from "../Parameter.js";

import {
    _ObjectMany,
    _ObjectValue,
    _Store
} from "../Data.js";

/**
 * 设置单条或多条存储数据。
 * @function _Set
 * @param  { any } arg - 要存储的单条或者多条数据
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 */
export function _Set(storage, arg) {
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

            _Store(storage, KEY_, VALUE_)
        }

        // 两个参数存在类型错误
        else throw new Error("If two parameters are passed in, the first parameter must be of type string, and the second parameter must exist and be valid.")
    }
}