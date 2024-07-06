import {
    $Array,
    $Object
} from "../../../methods/Parameter.js";

import {
    $ObjectMany,
    $ObjectValue,
    $Store
} from "../../../methods/Data.js";


/**
 * 设置单条或多条存储数据。
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 * 
 * @function $Set
 * 
 * @param { object } config 配置对象
 * @param { any } arg 要存储的单条或者多条数据
 */
export function $Set(config, arg) {
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
            const ARR_ = $Array(arg[0], "object");

            $ObjectMany(config, ARR_);
        }

        // 参数为对象
        else if (
            typeof arg[0] === "object" &&
            !Array.isArray(arg[0])
        ) {
            const OBJ_ = $Object(config, arg[0]);

            $ObjectValue(config, OBJ_);
        }

        // 其他情况
        else throw new Error("If only one parameter is passed in, the type of the parameter must be array or object.")
    }

    // 参数数量为 2
    else if (arg.length === 2) {
        // 第 1 个参数为字符串，且第 2 个参数有效
        // 第 1 个参数为 key
        // 第 2 个参数为 value
        const key = arg[0],
            value = arg[1];

        if (
            typeof key === "string" &&
            value !== undefined &&
            value !== null
        ) $Store(config, key, value);

        // 两个参数存在类型错误
        else throw new Error("If two parameters are passed in, the first parameter must be of type string, and the second parameter must exist and be valid.")
    }
}