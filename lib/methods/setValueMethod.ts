/* 设置单条或多条存储数据 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import { ValidateArray } from "../validate/ValidateArray"; // 验证数组
import { ValidateObject } from "../validate/ValidateObject"; // 验证对象
import { m_setManyFromKeyValue } from "./setManyFromKeyValue" // 批量设置值的方法
import { m_setManyFromObject } from "./setManyFromObject" // 批量设置值的方法
import { SetValueToStorage } from "../value/setValue" // 设置值到存储的方法
import { isArray, isObjectAndNotArray, isString, isEffective } from "../type/checkType";


/* ========== */


type KeyValueItem = Array<{ key: string, value: any }>;
type ObjectItem = Array<{ [key: string]: any }>;
type TupleItem = [string, any];

type itemsType = KeyValueItem | ObjectItem | TupleItem;


/* ========== */


/**
 * 设置单条或多条存储数据，是 StorageProvider 中的 set() 方法的实现。
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 * 
 * @function m_setValueMethod
 * @param { RealClassConfigType<boolean> } classConfig 
 * @param { KeyValueItem } items 参数数组
 * @returns { void } 无返回值
 */
export function m_setValueMethod(
    classConfig: RealClassConfigType<boolean>,
    items: KeyValueItem
): void

/**
 * 设置单条或多条存储数据，是 StorageProvider 中的 set() 方法的实现。
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 * 
 * @function m_setValueMethod
 * @param { RealClassConfigType<boolean> } classConfig 
 * @param { ObjectItem } items 参数数组
 * @returns { void } 无返回值
 */
export function m_setValueMethod(
    classConfig: RealClassConfigType<boolean>,
    items: ObjectItem
): void

/**
 * 设置单条或多条存储数据，是 StorageProvider 中的 set() 方法的实现。
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 * 
 * @function m_setValueMethod
 * @param { RealClassConfigType<boolean> } classConfig 
 * @param { TupleItem } items 参数数组
 * @returns { void } 无返回值
 */
export function m_setValueMethod(
    classConfig: RealClassConfigType<boolean>,
    items: TupleItem
): void


/* ========== */


export function m_setValueMethod(
    classConfig: RealClassConfigType<boolean>,
    items: itemsType
): void {
    /* 检查参数数量 */
    if (!isArray(items) || !(items.length === 1 || items.length === 2))
        throw new TypeError("Effective parameters must exist and the number of parameters must be exactly 1 or 2");

    // 参数数量为 1
    if (items.length === 1) {
        // 参数为数组
        if (isArray(items[0])) {
            const ARR_ = ValidateArray<"object">(classConfig, items[0], { type: "object" }) as KeyValueItem;

            m_setManyFromKeyValue(classConfig, ARR_);
        }

        // 参数为对象
        else if (isObjectAndNotArray(items[0])) {
            const OBJ_ = ValidateObject(classConfig, items[0]) as ObjectItem;

            m_setManyFromObject(classConfig, OBJ_);
        }

        // 其他情况
        else throw new TypeError("If only one parameter is passed in, the type of the parameter must be array or non-null object.")
    }

    // 参数数量为 2
    else if (items.length === 2) {
        // 第 1 个参数为字符串，且第 2 个参数有效，第 1 个参数为 key，第 2 个参数为 value
        const [KEY_, VALUE_] = items as TupleItem;

        if (isString(KEY_) &&
            isEffective(VALUE_)
        ) SetValueToStorage(classConfig, KEY_, VALUE_);

        // 两个参数存在类型错误
        else throw new TypeError("If two parameters are passed in, the first parameter must be of type string, and the second parameter must exist and be valid.")
    }
};