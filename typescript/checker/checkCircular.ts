/* 对象是否包含对自身的嵌套引用验证 */

import { type CheckCircularResult } from "../type/typeCheck";

/**
 * 处理对象并检查循环引用。
 * @function CheckCircular
 * @param { object | Array<any> } item 要处理的原始对象或数组。
 * @returns { { isCircular: boolean, warning: string | null, value: object | Array<any> } } 
 * - 返回一个对象，包含三个属性：
 * - isCircular: 一个布尔值，表示原始对象中是否存在循环引用。如果为 true，则表示存在循环引用；如果为 false，则表示不存在循环引用。
 * - warning: 一个字符串，如果原始对象中存在循环引用，则会包含一个警告信息。如果原始对象中不存在循环引用，则为 null。
 * - value: 如果不包含循环引用，返回原对象或数组；如果包含循环引用，返回处理后的原始对象或者数组的一个副本。
 * @summary 如果遇到循环引用，则循环引用的部分将被替换为字符串 "[Circular]"
 */
export function CheckCircular(item: object | Array<any>): CheckCircularResult {
    if (typeof item !== "object" || item === null || Array.isArray(item) === false) 
        throw new Error("Invalid input: The function expects an object or an array.");

    const _TYPE: "array" | "object" = Array.isArray(item) ? "array" : "object";

    const warn: Array<string> = [
        `Warning:`,
        `- This ${_TYPE} has the behavior of cyclically referencing itself, and we do not recommend doing so.`,
        `- Please check if there are potential errors in your code.`,
        // `- We have replaced the circular reference found in your ${_TYPE} with '[Circular]' to avoid potential issues.`
    ];


    /* ========== */


    const seenObjects = new WeakMap<any, true>();
    let hasCircular: boolean = false;

    /**
     * 递归地处理对象或数组。
     * @function process
     * @param { { [key: string]: any } | Array<any> } currentObj 当前正在处理的对象或数组。
     * @returns { any } 处理后的对象或数组。
     */
    function process(currentObj: {
        [key: string]: any
    } | Array<any>): any {
        if (typeof currentObj !== "object" || currentObj === null)
            return currentObj;

        if (seenObjects.has(currentObj)) {
            hasCircular = true;
            return "[Circular]";
        }

        // 标记当前对象已被处理过
        seenObjects.set(currentObj, true);

        // 数组
        if (Array.isArray(currentObj))
            return currentObj.map(i => process(i));

        // 对象
        else {
            const result: { [key: string]: any } = {};

            for (const key in currentObj) {
                if (currentObj.hasOwnProperty(key))
                    result[key] = process(currentObj[key]);
            }

            return result;
        }
    };

    /* ========== */

    const processedObj: object = process(item);

    return {
        isCircular: hasCircular, // 是否存在循环引用
        warning: hasCircular ? warn.join("\n") : null, // 提醒用户存在循环引用
        value: processedObj // 处理后的对象或数组
    };
};
