/* 验证函数有效性 */


import { type RealClassConfigType } from "../tsType/classConfigType";
import {
    isFunction,
    isInvalid
} from "../type/checkType";


/* ========== */


/**
 * 验证函数有效性
 *
 * @function ValidateFunction
 * @param { RealClassConfigType<boolean> } classConfig 类配置对象
 * @param { Function } func 需要验证的函数
 * @return { { functionName: string, functionSourceCode: string, numberOfParameters: number } } 验证结果对象
 */
export function ValidateFunction(
    classConfig: RealClassConfigType<boolean>,
    func: (...args: Array<any>) => any
): {
    functionName: string,
    functionSourceCode: string,
    numberOfParameters: number
} {
    let notice: Array<string> = [
        "Important Notice:",
        "Functions cannot be directly stored in localStorage or sessionStorage.",
        "localStorage or sessionStorage only supports storing string data.",
        "Functions are complex JavaScript objects that contain executable code and context information, which cannot be directly converted into a format that localStorage or sessionStorage can accept.",
        "If you need to persist data or logic related to functions, consider storing the function's source code as a string, the data the function operates on, or using alternative storage mechanisms like IndexedDB or a server-side database.",
    ];
    let warning: Array<string> = [
        "Warning:",
        "StorageProvider will attempt to store the following content of the function in Web Storage or communicate it to other pages:",
        "Function name",
        "Function source code",
        "Number of parameters",
    ];

    // 验证函数引用是否存在且不为空
    if (isInvalid(func))
        throw new Error("Function is required and cannot be null or undefined.");

    // 验证该函数是否为函数类型
    if (!isFunction(func))
        throw new Error(`${func} is not a function.`);

    // 警告信息
    if (classConfig.warn) {
        console.warn(notice.join("\n - "));
        console.warn(warning.join("\n - "));
    }

    return {
        functionName: func.name || "anonymous",
        functionSourceCode: func.toString(),
        numberOfParameters: func.length,
    };
}