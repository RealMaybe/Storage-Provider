import { isBoolean } from "../type/checkType";
import { CheckCircular } from "./checkCircular";
import { type CircularItem } from "../tsType/circularType";


/* ========== */


/**
 * 检查一个项目是否存在循环引用。
 * @function isCircular
 * @param { CircularItem } item 要检查循环引用的项目。
 * @returns { boolean } 一个布尔值，表示该项目是否为循环引用。
 */
export function isCircular(item: CircularItem): boolean;

/**
 * 检查一个项目是否存在循环引用，并返回额外的信息。
 * @function isCircular
 * @param { CircularItem } item 要检查循环引用的项目。
 * @param { boolean } tackle 是否返回处理后的对象。
 * @returns { { isCircular: boolean, value: CircularItem } }  
 * - 如果 tackle 为 true，返回一个对象，其中包含一个布尔值表示是否为循环引用以及处理后的对象
 * - 如果 tackle 为 false，返回一个布尔值，表示该项目是否为循环引用
 */
export function isCircular(
    item: CircularItem,
    tackle: true
): {
    isCircular: boolean,
    value: CircularItem
};


/* ========== */


export function isCircular(
    item: CircularItem,
    tackle?: boolean
): boolean | {
    isCircular: boolean,
    value: CircularItem
} {
    const { isCircular, value } = CheckCircular({} as any, item);

    if (isBoolean(tackle) && tackle) return { isCircular, value };
    else return isCircular;
};