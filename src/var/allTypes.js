/**
 * 获取变量的类型
 * 此函数用于判断并返回给定值的数据类型
 * 它特别处理了null和数组类型，因为这两种类型在JavaScript中通过typeof操作符判断时会返回不明确的结果
 * 
 * @param { any } value - 任意类型的值，其类型需要被判断
 * @returns { string } - 返回值的类型以字符串形式表示，如 "string", "number", "boolean", "null", "array" 等
 */
export function getType(value) {
    if (value === null) return "null"; // 判断值是否为null，因为null的类型判断比较特殊，需要单独处理
    if (Array.isArray(value)) return "array"; // 判断值是否为数组，Array.isArray()方法用于确定传入的值是否是数组
    return typeof value; // 对于非null和非数组的值，使用typeof操作符返回其类型
};

/**
 * 所有类型
 */
export const allTypes = [
    "array",
    "bigint",
    "boolean",
    "function",
    "null",
    "number",
    "object",
    "string",
    "symbol",
    "undefined"
];