import { isObjectAndNotArray, isFunction, isEffective } from "../../typeChecker";
import { StorageProvider } from "../Storage";


/* ========== */


type Provider = StorageProvider | typeof StorageProvider;


/* ========== */


const requiredMethods = [
    "storage",
    "save",
    "saveMany",
    "setMany",
    "set",
    "get",
    "getMany",
    "getAll",
    "delete",
    "remove",
    "removeMany",
    "clean"
];


/* ========== */


/**
 * 检查传入的参数是否是 StorageProvider 类或其子类，
 * 并且这些类的原型链上包含所有必需的方法。
 *
 * @param val - 要检查的参数，可以是类构造函数或实例对象。
 * @returns 如果参数是合法的 StorageProvider 类或其子类，则返回 true；否则返回 false。
 */
export function isProvider(val: any): val is Provider {
    if (!isObjectAndNotArray(val) &&
        !isFunction(val)
    ) return false;


    /* ========== */


    let prototypeChain: any[] = [];
    let currentPrototype: any;

    // 如果 val 是一个类构造函数
    if (isFunction(val)) currentPrototype = val.prototype;

    // 如果 val 是一个实例对象
    else currentPrototype = Object.getPrototypeOf(val);


    /* ========== */


    // 当currentPrototype存在时，循环执行以下操作
    while (isEffective(currentPrototype)) {
        // 将currentPrototype添加到prototypeChain数组中
        prototypeChain.push(currentPrototype);

        // 获取currentPrototype的原型
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    // 创建一个Set类型的allMethods变量，用于存储所有方法名
    const allMethods = new Set<string>();

    // 遍历原型链
    for (const prototype of prototypeChain) {
        for (const key of Object.getOwnPropertyNames(prototype)) {
            if (isFunction(prototype[key])) allMethods.add(key.toLowerCase());
        }
    }

    // 遍历requiredMethods数组中的每一个方法
    for (const method of requiredMethods) {
        // 将方法名首字母转换为小写
        const camelCaseMethod = method
            .charAt(0)
            .toLowerCase() + method.slice(1);

        // 如果allMethods中不包含小写首字母的方法名，也不包含原始方法名，则返回false
        if (!allMethods.has(camelCaseMethod) &&
            !allMethods.has(method)
        ) return false;
    }

    return true;
};