/* 数组去重 */

// 导入依赖
import { ValidateObject } from "./validate/ValidateObject.js"; // 验证对象的方法
import { ValidateArray } from "./validate/ValidateArray.js"; // 验证数组的方法

/**
 * 判断是否是原始类型
 * @param { any } value 需要判断的值
 * @return { boolean } 是否是原始类型
 */
const isPrimitive = value => value === null || (typeof value !== "object" && typeof value !== "function");


/**
 * 对比两个对象是否相同。
 * 相同条件：
 * - 两个对象地址一致
 * - 两个对象具有相同的属性数量（对应值也一致）
 * @param { { [key: string]: any } } val1 需要对比的对象 1
 * @param { { [key: string]: any } } val2 需要对比的对象 2
 * @return { boolean } 是否相同
 */
function equals(val1, val2) {
    if (isPrimitive(val1) || isPrimitive(val2))
        return Object.is(val1, val2);

    const entries1 = Object.entries(val1);
    const entries2 = Object.entries(val2);

    if (entries1.length !== entries2.length)
        return false;

    for (const [key, value] of entries1) {
        if (!equals(value, val2[key]))
            return false;
    }

    return true;
}

/**
 * 数组去重
 * 两个相同属性（对应值也一致）的对象，只保留第一个对象
 * @param { Array<any> } arr 需要去重的数组
 * @returns { Array<any> } 去重后的数组
 */
export function uniqueArray(arr) {
    const result = [];

    outer: for (const i of arr) {
        for (const j of result) {
            if (equals(i, j)) continue outer;
        }
        result.push(i);
    }

    return result;
};