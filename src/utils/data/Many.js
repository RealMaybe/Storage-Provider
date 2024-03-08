import { _All } from "./All.js";
import { _Array } from "../Parameter.js";
import { _Store } from "./Store.js";

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @param { Storage } storage - 存储对象
 * @param { Array.<string> } arr - 字符串数组
 * @param { String } type - 获取值之后的输出类型，可选值为 'array', 'object', 'array-object'
 * @returns { Array.<Object> | Object } - 根据指定类型返回不同格式的结果
 */
export function _GetMany(storage, arr, type) {
    // 有效性验证
    const ARR_ = _Array(arr, "string");

    const _TYPE = (t => {
        if (typeof t !== "string")
            throw new Error("The type of 'type' must be a string.");

        if (t !== "array" &&
            t !== "object" &&
            t !== "array-object")
            throw new Error("The only available formats are 'array', 'object', and 'array-object'.");

        return t
    })(type);

    /* ========== */

    // 格式判断
    let result;

    switch (_TYPE) {
        case "array":
            result = ARR_.map(key => ({
                [key]: _Store(storage, key)
            }));
            break;

        case "object":
            result = {};
            ARR_.forEach(key => { result[key] = _Store(storage, key) });
            break;

        case "array-object":
            result = ARR_.map(key => ({ key, value: _Store(storage, key) }));
            break;

        default:
            throw new Error("Invalid type specified.");
    }

    return result;
};