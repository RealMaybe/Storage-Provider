import { $Array } from "../../../methods/Parameter.js";
import { $Store } from "../../../methods/Data.js";

/* ========== */

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function $GetMany
 * 
 * @param { object } config 配置对象
 * @param { Array.<string> } arr 字符串数组
 * @param { String } type 获取值之后的输出类型，可选值为 'array', 'object', 'array-object'
 * @returns { Array.<object> | object } 根据指定类型返回不同格式的结果
 */
export function $GetMany(config, arr, type) {
    // 有效性验证
    const ARR_ = $Array(arr, "string");

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
                [key]: $Store(config, key)
            }));
            break;

        case "object":
            result = {};
            ARR_.forEach(key => { result[key] = $Store(config, key) });
            break;

        case "array-object":
            result = ARR_.map(key => ({ key, value: $Store(config, key) }));
            break;

        default:
            throw new Error("Invalid type specified.");
    }

    return result;
};