/* 对象是否包含对自身的嵌套引用验证 */


import { type RealClassConfigType } from "../tsType/classConfigType"; // 实际使用的类配置类型
import {
    type CircularItem, // 循环引用检查器需要查验的数据类型。
    type CheckCircularResult // 循环引用检查器的返回结果类型。
} from "../tsType/circularType";
import {
    checkType, // 检查数据类型
    isObject, // 检查是否为对象
    isArray, // 检查是否为数组
    isNull // 检查是否为 null
} from "../type/checkType";


/* ========== */


/**
 * 处理对象并检查循环引用。
 * 
 * @function CheckCircular
 * @param { RealClassConfigType<boolean> } _classConfig 类配置对象。
 * @param { CircularItem } item 要处理的原始对象。
 * @returns { CheckCircularResult }
 * - 返回一个对象，包含三个属性：
 * - isCircular: 一个布尔值，表示原始对象中是否存在循环引用。如果为 true，则表示存在循环引用；如果为 false，则表示不存在循环引用。
 * - warning: 一个字符串，如果原始对象中存在循环引用，则会包含一个警告信息。如果原始对象中不存在循环引用，则为 null。
 * - value: 如果不包含循环引用，返回原对象；如果包含循环引用，返回处理后的原始对象的一个副本。
 * @summary 如果遇到循环引用，则循环引用的部分将被替换为字符串 "[Circular]"
 */
export function CheckCircular(
    _classConfig: RealClassConfigType<boolean>,
    item: CircularItem
): CheckCircularResult {
    const TYPE: string = checkType(item);

    const warn: Array<string> = [
        `Warning:`,
        `- This ${TYPE} has the behavior of cyclically referencing itself, and we do not recommend doing so.`,
        `- Please check if there are potential errors in your code.`,
        // `- We have replaced the circular reference found in your ${TYPE} with "[Circular]" to avoid potential issues.`
    ];

    /* ========== */

    const seenObjects = new WeakMap();
    let isCircular: boolean = false;

    /**
     * 递归地处理对象或数组。
     * 
     * @function process
     * @param { CircularItem } currentObj 当前正在处理的对象或数组。
     * @returns { CircularItem | string } 处理后的对象或数组。
     */
    function process(currentObj: CircularItem): CircularItem | string {
        if (!isObject(currentObj) || isNull(currentObj))
            return currentObj;

        if (seenObjects.has(currentObj)) {
            isCircular = true;
            return "[Circular]";
        }

        // 标记当前对象已被处理过
        seenObjects.set(currentObj, true);

        // 数组
        if (isArray(currentObj))
            return currentObj.map(i => process(i));

        // 对象
        else {
            const result: { [key: string]: any } = {};

            for (const key in currentObj) {
                if (currentObj.hasOwnProperty(key)) {
                    const processedValue = process(currentObj[key]);

                    if (processedValue === currentObj)
                        result[key] = "[Circular]";
                    else
                        result[key] = processedValue;
                }
            }

            return result;
        }
    };

    /* ========== */

    const processedObj = process(item);

    return {
        isCircular, // 是否存在循环引用
        warning: isCircular ? warn.join("\n") : null, // 提醒用户存在循环引用
        value: processedObj // 处理后的对象或数组
    }
};