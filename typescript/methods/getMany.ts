/* 获取多个数据 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { ValidateArray } from "../validate/ValidateArray.js"; // 导入数组有效性验证函数
import { GetValueFromStorage } from "../value/getValue.js"; // 导入获取存储内容的函数

/* ========== */

// 类型
type outputType = "array" | "object" | "array-object";
type GetManyResult<T extends outputType> = T extends "array" ? Array<{
    [key: string]: any;
}> : T extends "object" ? {
    [key: string]: any;
} : T extends "array-object" ? Array<{
    key: string;
    value: any;
}> : never;
type resule = Array<{ [x: string]: any; }> | { [key: string]: any } | Array<{ key: string, value: any }>

/* ========== */

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果。
 * - 关于 type 的具体用法、输出格式等详见说明文档。
 * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
 * 
 * @function m_getMany
 * 
 * @param { TypeClassConfig } classConfig 配置对象
 * @param { Array<string> } keys 字符串数组
 * @param { outputType } outputType 获取值之后的输出类型，可选值为 "array", "object", "array-object"
 * 
 * @returns { Array<{ [key: string]: any }> | { [key: string]: any } | Array<{ key: string, value: any }> } 根据 outputType 指定类型返回不同格式的结果
 * 
 * @example outputType = "array" 则返回 Array<{ [key: string]: any }>
 * @example outputType = "object" 则返回 { [key: string]: any }
 * @example outputType = "array-object" 则返回 Array<{ key: string, value: any }>
 */
export function m_getMany<T extends outputType>(
    classConfig: TypeClassConfig,
    keys: Array<string>,
    outputType: T
): GetManyResult<T> {
    // 参数验证
    const validatedKeys: Array<string> = ValidateArray(classConfig, keys, "string");
    if (typeof outputType !== "string")
        throw new Error(`The type of "outputType" must be a string.`);

    if (!["array", "object", "array-object"].includes(outputType))
        throw new Error(`The only available formats are "array", "object", and "array-object".`);

    // 格式判断
    let result: resule;

    switch (outputType) {
        case "array":
            result = validatedKeys.map(key => ({
                [key]: GetValueFromStorage(classConfig, key)
            }));
            break;

        case "object":
            result = {};
            validatedKeys.forEach(key => {
                result[key] = GetValueFromStorage(classConfig, key)
            });
            break;

        case "array-object":
            result = validatedKeys.map(key => ({
                key,
                value: GetValueFromStorage(classConfig, key)
            }));
            break;

        default:
            throw new Error("Invalid type specified.");
    }

    return result as GetManyResult<T>;
};