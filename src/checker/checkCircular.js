/* 对象是否包含对自身的嵌套引用验证 */

/**
 * 处理对象并检查循环引用。
 * 
 * @function CheckCircular
 * 
 * @param { object | Array<any> } item 要处理的原始对象或数组。
 * 
 * @returns { { isCircular: boolean, value: object | Array<any>, warning: string | null } } 一个对象，包含三个属性：
 * - isCircular: 一个布尔值，表示原始对象中是否存在循环引用。如果为 true，则表示存在循环引用；如果为 false，则表示不存在循环引用。
 * - warning: 一个字符串，如果原始对象中存在循环引用，则会包含一个警告信息。如果原始对象中不存在循环引用，则为 null。
 * - value: 处理后的原始对象或者数组的一个副本。
 * 
 * @summary 如果遇到循环引用，则循环引用的部分将被替换为字符串 "[Circular]"
 */
export function CheckCircular(item) {
    const _TYPE = (() => {
        if (Array.isArray(item)) return "array";

        else if (typeof item === "object" && item !== null) return "object";

        else throw new Error("Why would you pass a parameter of a type that inherently cannot have circular references to a function specifically designed to verify circular references ?");
    })();

    const warn = [
        `Warning:`,
        `- This ${_TYPE} has the behavior of cyclically referencing itself, and we do not recommend doing so.`,
        `- Please check if there are potential errors in your code.`,
        // `- We have replaced the circular reference found in your ${_TYPE} with '[Circular]' to avoid potential issues.`
    ];


    /* ========== */


    const cache = new WeakMap();
    let hasCircular = false;

    /**
     * 递归地处理对象或数组。
     * 
     * @function process
     * 
     * @param { object | Array<any> } obj 当前正在处理的对象或数组。
     * 
     * @returns { object | Array<any> } 处理后的对象或数组。
     */
    function process(obj) {
        if (typeof obj !== "object" || obj === null) return obj;

        if (cache.has(obj)) {
            hasCircular = true;
            return "[Circular]";
        }

        cache.set(obj, true);

        if (Array.isArray(obj)) return obj.map(i => process(i));

        const result = {};

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) result[key] = process(obj[key]);
        }

        return result;
    };

    /* ========== */

    const processedObj = process(item);

    return {
        isCircular: hasCircular, // 是否存在循环引用
        warning: hasCircular ? warn.join("\n") : null, // 提醒用户存在循环引用
        value: processedObj // 处理后的对象或数组
    };
}