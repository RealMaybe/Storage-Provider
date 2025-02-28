/* 获取多个数据 */

// 导入依赖
import { ValidateArray } from "../validate/ValidateArray.js"; // 导入数组有效性验证函数
import { GetValueFromStorage } from "../value/getValue.js"; // 导入获取存储内容的函数

/* ========== */

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function m_getMany
 * 
 * @param { { storage: Storage, warn: boolean } } classConfig 配置对象
 * @param { Array<string> } keys 字符串数组
 * @param { "array" | "object" | "array-object" } outputType 获取值之后的输出类型，可选值为 "array", "object", "array-object"
 * 
 * @returns { Array<{ [key: string]: any }> | { [key: string]: any } | Array<{ key: string, value: any }> } 根据 outputType 指定类型返回不同格式的结果
 * 
 * @example (classConfig, keys, outputType = "array") => Array<{ [storageKey: string]: any }>
 * @example (classConfig, keys, outputType = "object") => { [storageKey: string]: any }
 * @example (classConfig, keys, outputType = "array-object") => Array<{ key: string, value: any }>
 */
export function m_getMany(classConfig, keys, outputType) {
    // 定义格式处理策略
    const formatHandlers = {
        array: keys => keys.map(key => ({
            [key]: GetValueFromStorage(classConfig, key)
        })),
        object: keys => {
            const result = {};
            keys.forEach(key => result[key] = GetValueFromStorage(classConfig, key));
            return result;
        },
        "array-object": keys => keys.map(key => ({
            key,
            value: GetValueFromStorage(classConfig, key)
        }))
    };

    /* ===== */

    // 参数验证
    const validatedKeys = ValidateArray(classConfig, keys, "string");
    if (typeof outputType !== "string")
        throw new Error(`The type of "outputType" must be a string.`);

    if (!Object.keys(formatHandlers).includes(outputType))
        throw new Error(`The only available formats are "array", "object", and "array-object".`);

    // 获取并执行相应的处理函数
    const handler = formatHandlers[outputType];
    if (handler) return handler(validatedKeys);
    else throw new Error("Invalid type specified.");
};