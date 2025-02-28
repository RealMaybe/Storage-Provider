/* 设置单条或多条存储数据 */

// 导入依赖
import { type TypeClassConfig } from "../type/typeClassConfig";
import { ValidateArray } from "../validate/ValidateArray"; // 验证数组
import { ValidateObject } from "../validate/ValidateObject"; // 验证对象
import { m_setManyFromKeyValue } from "./setManyFromKeyValue" // 批量设置值的方法
import { m_setManyFromObject } from "./setManyFromObject" // 批量设置值的方法
import { SetValueToStorage } from "../value/setValue" // 设置值到存储的方法

/* ========== */

// 类型定义
type TypeKeyValueObject = Array<{ key: string, value: any }>;
type TypeObject = Array<{ [key: string]: any }>;
type TypeKeyValue = [string, any];
type SetValueItems = TypeKeyValueObject | TypeObject | TypeKeyValue;

// 函数重载
export function m_setValueMethod(classConfig: TypeClassConfig, items: TypeKeyValueObject): void
export function m_setValueMethod(classConfig: TypeClassConfig, items: TypeObject): void
export function m_setValueMethod(classConfig: TypeClassConfig, items: TypeKeyValue): void

/* ========== */

/**
 * 设置单条或多条存储数据，需要配合 StorageProvider 中的 Set() 方法使用。
 * - 该函数传入参数数量为必须为 1 ~ 2。
 * - 参数的传入原则详见说明文档。
 * 
 * @function m_setValueMethod
 * 
 * @param { TypeClassConfig } classConfig 
 * @param { SetValueItems } items 
 */
export function m_setValueMethod(
    classConfig: TypeClassConfig,
    items: SetValueItems
): void {
    /* 检查参数数量 */
    if (!(items.length === 1 || items.length === 2))
        throw new Error("Effective parameters must exist and the number of parameters must be exactly 1 or 2");

    // 参数数量为 1
    if (items.length === 1) {
        // 参数为数组
        if (Array.isArray(items[0])) {
            const ARR_: Array<any> = ValidateArray(classConfig, items[0], "object");

            m_setManyFromKeyValue(classConfig, ARR_);
        }

        // 参数为对象
        else if (typeof items[0] === "object" &&
            items[0] !== null &&
            !Array.isArray(items[0])
        ) {
            const OBJ_: { [key: string]: any } = ValidateObject(classConfig, items[0]);

            m_setManyFromObject(classConfig, OBJ_);
        }

        // 其他情况
        else throw new Error("If only one parameter is passed in, the type of the parameter must be array or non-null object.")
    }

    // 参数数量为 2
    else if (items.length === 2) {
        // 第 1 个参数为字符串，且第 2 个参数有效，第 1 个参数为 key，第 2 个参数为 value
        const [KEY_, VALUE_] = items;

        if (typeof KEY_ === "string" &&
            VALUE_ !== void 0 &&
            VALUE_ !== null
        ) SetValueToStorage(classConfig, KEY_, VALUE_);

        // 两个参数存在类型错误
        else throw new Error("If two parameters are passed in, the first parameter must be of type string, and the second parameter must exist and be valid.")
    }
};