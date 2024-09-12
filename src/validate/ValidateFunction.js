/* 验证函数有效性 */

/**
 * 验证函数有效性
 * 
 * @function ValidateFunction
 * 
 * @param { { warn: boolean } } config 配置对象
 * @param { Function } func 函数名称
 * 
 * @return { { functionName: string, functionSourceCode: string, numberOfParameters: number, tips: Array<string> } } 验证结果对象
 */
export function ValidateFunction(config, func) {
    let notice = [
        "Important Notice:",
        "Functions cannot be directly stored in localStorage or sessionStorage.",
        "localStorage or sessionStorage only supports storing string data.",
        "Functions are complex JavaScript objects that contain executable code and context information, which cannot be directly converted into a format that localStorage or sessionStorage can accept.",
        "If you need to persist data or logic related to functions, consider storing the function's source code as a string, the data the function operates on, or using alternative storage mechanisms like IndexedDB or a server-side database."
    ];
    let warning = [
        "Warning:",
        "StoreProvider will attempt to store the following content of your function in either localStorage or sessionStorage:",
        "function name",
        "function source code",
        "number of parameters"
    ];

    // 验证函数引用是否存在且不为空
    if (func === null || func === undefined)
        throw new Error("Function is required and cannot be null or undefined.");

    // 验证该函数是否为函数类型
    if (typeof func !== "function")
        throw new Error(`${func} is not a function.`);

    // 警告信息
    if (config.warn) {
        console.warn(notice.join("\n - "));
        console.warn(warning.join("\n - "));
    }

    return {
        functionName: func.name || "anonymous",
        functionSourceCode: func.toString(),
        numberOfParameters: func.length
    }
}