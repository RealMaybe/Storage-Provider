/* 对象是否包含对自身的嵌套引用验证 */

/**
 * 处理对象并检查循环引用。
 * 
 * @function CheckCircular
 * @param { any } item 要处理的原始对象。
 * @returns { { isCircular: boolean, warning: string | null, value: any } }
 * - 返回一个对象，包含三个属性：
 * - isCircular: 一个布尔值，表示原始对象中是否存在循环引用。如果为 true，则表示存在循环引用；如果为 false，则表示不存在循环引用。
 * - warning: 一个字符串，如果原始对象中存在循环引用，则会包含一个警告信息。如果原始对象中不存在循环引用，则为 null。
 * - value: 如果不包含循环引用，返回原对象；如果包含循环引用，返回处理后的原始对象的一个副本。
 * @summary 如果遇到循环引用，则循环引用的部分将被替换为字符串 "[Circular]"
 */
export function CheckCircular(item) {
    const _TYPE = (() => {
        if (Array.isArray(item)) return "array";
        else if (typeof item === "object" && item !== null) return "object";
        else return typeof item;
    })();

    const warn = [
        `Warning:`,
        `- This ${_TYPE} has the behavior of cyclically referencing itself, and we do not recommend doing so.`,
        `- Please check if there are potential errors in your code.`,
        // `- We have replaced the circular reference found in your ${_TYPE} with '[Circular]' to avoid potential issues.`
    ];


    /* ========== */


    const seenObjects = new WeakMap();
    let isCircular = false;

    /**
     * 递归地处理对象或数组。
     * 
     * @function process
     * @param { object | Array<any> } currentObj 当前正在处理的对象或数组。
     * @returns { object | Array<any> | "[Circular]" } 处理后的对象或数组。
     */
    function process(currentObj) {
        if (typeof currentObj !== "object" || currentObj === null)
            return currentObj;

        if (seenObjects.has(currentObj)) {
            isCircular = true;
            return "[Circular]";
        }

        // 标记当前对象已被处理过
        seenObjects.set(currentObj, true);

        // 数组
        if (Array.isArray(currentObj))
            return currentObj.map(i => process(i));

        // 对象
        else {
            const result = {};

            for (const key in currentObj) {
                if (currentObj.hasOwnProperty(key))
                    result[key] = process(currentObj[key]);
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
    };
}