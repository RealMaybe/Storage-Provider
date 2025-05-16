/* 获取多个数据 */


import { type RealClassConfigType } from "../../scriptType/classConfigType";
import { objKeys } from "../../assistant/objKeys";
import { ValidateArray } from "../validate/ValidateArray"; // 导入数组有效性验证函数
import { GetValueFromStorage } from "../value/getValue"; // 导入获取存储内容的函数
import { isString } from "../../typeChecker";


/* ========== */


/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果
 * - type 的指定类型。
 */
export type OutputType = "array" | "object" | "array-object";
export type OutputResult<
    K extends string,
    T extends OutputType
> = T extends "array" ? Array<{ [P in K]: any }> :
    T extends "object" ? { [P in K]: any } :
    T extends "array-object" ? Array<{ key: K, value: any }> :
    never;


/* ========== */


/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function m_getMany
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { Array<string> } keys 字符串数组
 * @param { "array" } outputType 获取值之后的输出类型，可选值为 "array", "object", "array-object"
 * @returns { Array<{ [P in K]: any }> } 根据 outputType 指定类型返回不同格式的结果
 * 
 * @example (classConfig, keys, outputType = "array") => Array<{ [storageKey: string]: any }>
 */
export function m_getMany<K extends string>(
    classConfig: RealClassConfigType<boolean>,
    keys: Array<K>,
    outputType: "array"
): Array<{ [P in K]: any }>;

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function m_getMany
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { Array<string> } keys 字符串数组
 * @param { "object" } outputType 
 * @returns { { [P in K]: any } } 根据 outputType 指定类型返回不同格式的结果
 * 
 * @example (classConfig, keys, outputType = "object") => { [storageKey: string]: any }
 */
export function m_getMany<K extends string>(
    classConfig: RealClassConfigType<boolean>,
    keys: Array<K>,
    outputType: "object"
): { [P in K]: any };

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function m_getMany
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { Array<string> } keys 字符串数组
 * @param { "array-object" } outputType 
 * @returns { Array<{ key: K, value: any }> } 根据 outputType 指定类型返回不同格式的结果
 * 
 * @example (classConfig, keys, outputType = "array-object") => Array<{ key: string, value: any }>
 */
export function m_getMany<K extends string>(
    classConfig: RealClassConfigType<boolean>,
    keys: Array<K>,
    outputType: "array-object"
): Array<{
    key: K,
    value: any
}>;


/* ========== */


// 实际实现逻辑
export function m_getMany<K extends string>(
    classConfig: RealClassConfigType<boolean>,
    keys: Array<K>,
    outputType: OutputType
): OutputResult<K, typeof outputType> {
    // 定义格式处理策略
    const formatHandlers = {
        // 返回一个对象数组，每个对象包含一个键值对
        array: (keys: Array<K>) => keys.map(
            (key: K) => ({
                [key]: GetValueFromStorage(classConfig, key)
            })
        ) as Array<{ [P in K]: any }>,

        // 返回一个对象，每个键值对对应一个键值
        object: (keys: Array<K>) => {
            const result: { [P in K]?: any } = {};
            keys.forEach((key: K) => {
                try {
                    result[key] = GetValueFromStorage(classConfig, key);
                } catch (err) {
                    console.error(`Failed to retrieve value for key "${key}":`, err);
                }
            });
            return result as { [P in K]: any };
        },

        // 返回一个对象数组，每个对象包含一个键值对
        "array-object": (keys: Array<K>) => keys.map(
            key => ({
                key,
                value: GetValueFromStorage(classConfig, key)
            })
        ) as Array<{ key: K, value: any }>
    };

    /* ===== */

    // 参数验证
    const validatedKeys = ValidateArray<"string">(classConfig, keys, { type: "string" }) as Array<K>;
    if (!isString(outputType))
        throw new TypeError(`The type of "outputType" must be a string.`);

    if (!objKeys(formatHandlers).includes(outputType))
        throw new TypeError(`The only available formats are "array", "object", and "array-object".`);

    // 获取并执行相应的处理函数
    const handler = formatHandlers[outputType];
    if (handler) return handler(validatedKeys);
    else throw new TypeError("Invalid type specified.");
};