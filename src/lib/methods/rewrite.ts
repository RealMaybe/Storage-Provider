/* 重写器 */


import { type RealClassConfigType } from "../../scriptType/classConfigType";
import { StorageProvider } from "../Storage";
import { m_getMany } from "./getMany";
import { m_setManyFromObject } from "./setManyFromObject";
import { haveSameKeys } from "../validate/objectHaveSameKeys";
import { isArray, isString, isFunction, isObjectAndNotArray } from "../../typeChecker";


/* ========== */


/**
 * 用于重写本地存储中的数据
 * - 该方法从本地存储中获取数据并传递给回调函数，回调函数返回新的数据对象，然后将新的数据对象写回本地存储。
 * - 如果传入的是单个字符串，则获取到的是该字符串对应的数据。
 * - 如果传入的是数组，则获取到的是数组中每个字符串对应的数据，并返回为一个对象。
 * - 须要确保回调函数返回的对象与原始数据对象具有相同的键。
 * 
 * @param { RealClassConfigType<boolean> } classConfig 类配置
 * @param { string | Array<string> } items 数据
 * @param { (item: { [key: string]: any }) => ({ [key: string]: any }) } callback 回调函数
 * @param { StorageProvider } provider 存储提供者
 * @returns { void } 无返回值
 */
export function m_rewrite(
    classConfig: RealClassConfigType<boolean>,
    items: string | Array<string>,
    callback: (item: { [key: string]: any }) => ({ [key: string]: any }),
    provider: StorageProvider
): void {
    // 确保 items 是一个数组或字符串
    const KEYS_: Array<string> = isArray(items) ? items : isString(items) ? [items] : [];
    if (KEYS_.length === 0) throw new TypeError("Items must be a non-empty string or array.");

    // 数据
    const getResult: { [key: string]: any } = m_getMany(classConfig, KEYS_, "object"); // 获取到的数据值
    let rewriteResult: { [key: string]: any }; // 重写对象

    // 调用回调函数并捕获可能的错误
    try {
        if (!isFunction(callback)) throw new TypeError("Callback must be a function.");
        rewriteResult = callback.call(provider, getResult);
    } catch (err: any) { throw new TypeError(`Callback execution failed: ${err.message}`) }

    // 检查 rewriteResult 是否是一个有效的对象并且键相同
    if (!isObjectAndNotArray(rewriteResult))
        throw new TypeError("The return value of the rewrite method must be a non array object.");

    const { judge, missingKeys, extraKeys } = haveSameKeys(getResult, rewriteResult);

    if (!judge) throw new TypeError([
        "The return value of the rewrite method must have the same keys as the original data.",
        `- The missing attributes are as follows: '${missingKeys.join("', '")}'`,
        `- The extra attributes are as follows: '${extraKeys.join("', '")}'`
    ].join("\n"));

    // 将新的数据对象写回本地存储
    m_setManyFromObject(classConfig, rewriteResult);
};