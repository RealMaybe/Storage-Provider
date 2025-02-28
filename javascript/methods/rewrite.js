/* 重写器 */

// 导入依赖
import { m_getMany } from "./getMany.js";
import { m_setManyFromObject } from "./setManyFromObject.js";
import { haveSameKeys } from "../validate/objectHaveSameKeys.js";

/* ========== */

/**
 * 用于重写本地存储中的数据
 * - 该方法从本地存储中获取数据并传递给回调函数，回调函数返回新的数据对象，然后将新的数据对象写回本地存储。
 * - 如果传入的是单个字符串，则获取到的是该字符串对应的数据。
 * - 如果传入的是数组，则获取到的是数组中每个字符串对应的数据，并返回为一个对象。
 * - 须要确保回调函数返回的对象与原始数据对象具有相同的键。
 * 
 * @param { object } classConfig 类配置
 * @param { string | Array<string> } items 数据
 * @param { (item: { [key: string]: any }) => { [key: string]: any } } callback 回调函数
 * @param { StorageProvider } provider
 * 
 * @returns { void } 无返回值
 */
export function m_rewrite(classConfig, items, callback, provider) {
    // 确保 items 是一个数组或字符串
    const KEYS_ = Array.isArray(items) ? items : typeof items === "string" ? [items] : [];
    if (KEYS_.length === 0) throw new Error("Items must be a non-empty string or array.");

    let getResult = m_getMany(classConfig, KEYS_, "object"); // 获取到的数据值: { [key: string]: any }
    let rewriteResult; // 重写对象: { [key: string]: any }

    // 调用回调函数并捕获可能的错误
    try {
        if (typeof callback === "function") rewriteResult = callback.call(provider, getResult);
        else throw new Error("Callback must be a function.");
    } catch (error) {
        throw new Error(`Callback execution failed: ${error.message}`);
    }

    let KeysJudge = haveSameKeys(getResult, rewriteResult);

    // 检查 rewriteResult 是否是一个有效的对象并且键相同
    if (typeof rewriteResult === "object" &&
        rewriteResult !== null &&
        !Array.isArray(rewriteResult) &&
        KeysJudge.judge
    ) m_setManyFromObject(classConfig, rewriteResult);
    else throw new Error([
        "Rewrite result must have the same keys as the original data.",
        `- The missing attributes are as follows: '${KeysJudge.missingKeys.join("', '")}'`,
        `- The extra attributes are as follows: '${KeysJudge.extraKeys.join("', '")}'`
    ].join("\n"))
}