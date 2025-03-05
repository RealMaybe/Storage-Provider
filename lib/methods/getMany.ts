/* 获取多个数据 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import { objKeys } from "../assistant/objKeys";
import { ValidateArray } from "../validate/ValidateArray"; // 导入数组有效性验证函数
import { GetValueFromStorage } from "../value/getValue"; // 导入获取存储内容的函数
import { isString } from "../type/checkType";


/* ========== */


/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果
 * - type 的指定类型。
 */
export type OutputType = "array" | "object" | "array-object";
export type OutputResult = Array<{ [key: string]: any }> | { [key: string]: any } | Array<{ key: string; value: any; }>


/* ========== */


export function m_getMany(classConfig: RealClassConfigType<boolean>, keys: Array<string>, outputType: "array"): Array<{ [key: string]: any }>;
export function m_getMany(classConfig: RealClassConfigType<boolean>, keys: Array<string>, outputType: "object"): { [storageKey: string]: any };
export function m_getMany(classConfig: RealClassConfigType<boolean>, keys: Array<string>, outputType: "array-object"): Array<{ key: string, value: any }>;


/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function m_getMany
 * @param { RealClassConfigType<boolean> } classConfig 配置对象
 * @param { Array<string> } keys 字符串数组
 * @param { OutputType } outputType 获取值之后的输出类型，可选值为 "array", "object", "array-object"
 * @returns { Array<{ [key: string]: any }> | { [key: string]: any } | Array<{ key: string, value: any }> } 根据 outputType 指定类型返回不同格式的结果
 * 
 * @example (classConfig, keys, outputType = "array") => Array<{ [storageKey: string]: any }>
 * @example (classConfig, keys, outputType = "object") => { [storageKey: string]: any }
 * @example (classConfig, keys, outputType = "array-object") => Array<{ key: string, value: any }>
 */
export function m_getMany(
    classConfig: RealClassConfigType<boolean>,
    keys: Array<string>,
    outputType: OutputType
): OutputResult {
    // 定义格式处理策略
    const formatHandlers = {
        array: (keys: Array<string>) => keys.map(
            (key: string) => ({
                [key]: GetValueFromStorage(classConfig, key)
            })
        ),
        object: (keys: Array<string>) => {
            const result: { [key: string]: any } = {};
            keys.forEach((key: string) => {
                try {
                    result[key] = GetValueFromStorage(classConfig, key);
                } catch (err) { console.error(`Failed to retrieve value for key "${key}":`, err) }
            });
            return result;
        },
        "array-object": (keys: Array<string>) => keys.map(
            key => ({
                key,
                value: GetValueFromStorage(classConfig, key)
            })
        )
    };

    /* ===== */

    // 参数验证
    const validatedKeys = ValidateArray<"string">(classConfig, keys, { type: "string" });
    if (!isString(outputType))
        throw new TypeError(`The type of "outputType" must be a string.`);

    if (!objKeys(formatHandlers).includes(outputType))
        throw new TypeError(`The only available formats are "array", "object", and "array-object".`);

    // 获取并执行相应的处理函数
    const handler = formatHandlers[outputType];
    if (handler) return handler(validatedKeys);
    else throw new TypeError("Invalid type specified.");
};