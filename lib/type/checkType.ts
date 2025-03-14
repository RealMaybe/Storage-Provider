/* 类型检查函数 */


import { objIs } from "../assistant/objIs";


/* ========== */


/**
 * 判断一个值是否为 NaN
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是 NaN，则返回 true，否则返回 false
 */
export const isNotANumber = (val: any): boolean => objIs(NaN, val);


/**
 * 判断一个值是否为 null
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是 null，则返回 true，否则返回 false
 */
export const isNull = (val: any): boolean => val === null;

/**
 * 判断一个值是否为 undefined
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是 undefined，则返回 true，否则返回 false
 */
export const isUndefined = (val: any): boolean => val === void 0;

/**
 * 判断一个值是否为 Infinity 或 -Infinity。
 *
 * @param { any } value 任意类型的值，其类型需要被判断
 * @returns { boolean } 如果值为 Infinity 或 -Infinity，则返回 true，否则返回 false
 */
export const isInfinity = (value: any): boolean => value === Infinity || value === -Infinity;

/**
 * 判断一个值是否为数组
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是数组，则返回 true，否则返回 false
 */
export const isArray = Array.isArray as (arg: any) => arg is any[];

/**
 * 判断一个值是否为 bigint
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是 bigint，则返回 true，否则返回 false
 */
export const isBigInt = (val: any): boolean => typeof val === "bigint";

/**
 * 判断一个值是否为布尔值
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是布尔值，则返回 true，否则返回 false
 */
export const isBoolean = (val: any): boolean => typeof val === "boolean";

/**
 * 判断一个值是否为函数
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是函数，则返回 true，否则返回 false
 */
export const isFunction = (val: any): boolean => typeof val === "function";

/**
 * 判断一个值是否为数字
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是数字，则返回 true，否则返回 false
 */
export const isNumber = (val: any): boolean => typeof val === "number";

/**
 * 判断一个值是否为非 null 对象
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是非 null 对象，则返回 true，否则返回 false
 */
export const isObject = (val: any): boolean => typeof val === "object" && val !== null;

/**
 * 判断一个值是否为非 null 非数组对象
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是非 null 非数组对象，则返回 true，否则返回 false
 */
export const isObjectAndNotArray = (val: any): boolean => isObject(val) && !isArray(val);

/**
 * 判断一个值是否为字符串
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是字符串，则返回 true，否则返回 false
 */
export const isString = (val: any): boolean => typeof val === "string";

/**
 * 判断一个值是否为 symbol
 * @param { any } val 任意类型的值，其类型需要被判断
 * @return { boolean } 如果值是 symbol，则返回 true，否则返回 false
 */
export const isSymbol = (val: any): boolean => typeof val === "symbol";

/**
 * 获取变量的类型
 * - 此函数用于判断并返回给定值的数据类型
 * - 它特别处理了 null 和数组类型，因为这两种类型在 JavaScript 中通过 typeof 操作符判断时会返回不明确的结果
 * - 对于 NaN 和 Infinity，它返回 "NaN" 和 "Infinity"，因为它们是特殊的数字类型，如果需要返回数字，可以修改此函数的第二个参数为 true
 * - 对于其他类型，它直接返回 typeof 操作符的结果
 * 
 * @param { any } val 任意类型的值，其类型需要被判断
 * @param { boolean } [skipSpecialNumberCheck=false] 是否跳过特殊数字检查，可选参数，默认为 false
 * - 如果为 true，则 NaN 和 Infinity 返回 "number"
 * - 如果为 false，则 NaN 返回 "NaN"，Infinity 返回 "Infinity"
 * @returns { string } 返回值的类型以字符串形式表示，如 "string", "number", "boolean", "null", "array" 等
 */
export const checkType = (val: any, skipSpecialNumberCheck: boolean = false): string => {
    if (isNull(val)) return "null";
    if (isArray(val)) return "array";

    if (!skipSpecialNumberCheck) {
        if (isNotANumber(val)) return "NaN";
        if (isInfinity(val)) return "Infinity";
    }

    return typeof val;
};

/**
 * 判断一个值是否为无效值（null 或 undefined 或 NaN 或 Infinity 或 -Infinity）
 * 可以通过第二个参数指定要忽略的无效值
 * @param { any } val 任意类型的值，其类型需要被判断
 * @param { Array<string> } [ignoreList] 可选参数，指定要忽略的无效值类型
 * @return { boolean } 如果值是无效值且不在忽略列表中，则返回 true，否则返回 false
 */
export const isInvalid = (val: any, ignoreList?: Array<string>): boolean => {
    const invalidTypes = ["null", "undefined", "NaN", "Infinity"];
    const type = checkType(val);

    if (ignoreList && ignoreList.includes(type)) return false;
    return invalidTypes.includes(type);
};

/**
 * 判断一个值是否为有效值（非 null，非 undefined，非 NaN，非 Infinity 或 -Infinity）
 * 可以通过第二个参数指定要忽略的无效值
 * @param { any } val 任意类型的值，其类型需要被判断
 * @param { Array<string> } [ignoreList] 可选参数，指定要忽略的无效值类型
 * @return { boolean } 如果值是有效值或在忽略列表中的无效值，则返回 true，否则返回 false
 */
export const isEffective = (val: any, ignoreList?: Array<string>): boolean => !isInvalid(val, ignoreList);