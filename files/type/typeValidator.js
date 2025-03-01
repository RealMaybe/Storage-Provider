/**
 * 验证类型
 */
export const typeValidator = {
    array: Array.isArray,
    bigint: (val) => typeof val === "bigint",
    boolean: (val) => typeof val === "boolean",
    function: (val) => typeof val === "function",
    null: (val) => val === null,
    number: (val) => typeof val === "number",
    object: (val) => typeof val === "object" && val !== null && !Array.isArray(val),
    string: (val) => typeof val === "string",
    symbol: (val) => typeof val === "symbol",
    undefined: (val) => typeof val === "undefined",
    map: (val) => toTypeString(val) === "[object Map]",
    set: (val) => toTypeString(val) === "[object Set]",
    date: (val) => toTypeString(val) === "[object Date]",
    regExp: (val) => toTypeString(val) === "[object RegExp]",
};