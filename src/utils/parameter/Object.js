import { _circularReferenceChecker } from "../../methods/Checker.js";

/**
 * - 查验对象是否为非空对象。
 * - obj 必须是一个非空对象，并且不能是数组。
 * - 这是为了确保只有键值对存在于 obj 中，而不是其他类型的数据。
 * 
 * 
 * @function $Object
 * @param { object } config 配置对象
 * @param { object } obj 一个非空对象
 * @returns { object } 返回传入的非空对象
 * 
 * @throws 抛出错误：当对象为空或包含无效值时
 * @throws 抛出错误：当传入的参数不是对象时
 * 
 * @summary 如果传入的对象存在循环引用自身的行为，在默认情况下，控制台会提示警告信息
 * @summary 不建议传入存在循环引用自身的行为的对象，虽然这样并不会报错
 */
export function $Object(config, obj) {
    if (
        obj !== undefined &&
        obj !== null &&
        !Array.isArray(obj) &&
        typeof obj === "object"
    ) {
        // 对象及对象内属性值有效性验证
        const valid = (() => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];

                    if (value !== undefined && value !== null)
                        return true;
                    else
                        return false;
                }
            }
        })();


        // 循环引用验证
        const circle = _circularReferenceChecker(obj);
        if (circle === true && config.warn === true) {
            console.warn("Warning: This object has the behavior of cyclically referencing itself, and we do not recommend doing so.");
            console.warn("The objects with circular references are as follows:\n", obj);
            console.warn("Warning: We have cleared the section that references itself in a loop for you. Please check the code for potential errors.");
        }


        // 非空验证，去除循环引用
        let cache = [];

        const objString = JSON.stringify(obj, (_, val) => {
            if (typeof val === "object" && val !== null) {
                if (cache.indexOf(val) !== -1) return;
                cache.push(val);
            }
            return val;
        });

        if (objString !== "{}" && valid === true)
            return obj;

        cache = null;


        // 抛出报错：对象为空或存在无效值
        throw new Error("Object is empty or there is an invalid value in the object.");
    }

    // 抛出报错：传入参数的类型不为 object
    else
        throw new Error("Invalid data type: The parameter passed in by this method must be of type object.");
}