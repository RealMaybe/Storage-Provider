/**
 * 用于验证 value 的有效性。
 * @function $Value
 * @param { object } config 配置对象。
 * @param { any } value 存储值。
 * @returns { any } 返回传入的值。
 * 
 * @throws { Error } 如果传入的值为空，将抛出错误。
 */
export function $Value(config, value) {
    if (value === undefined || value === null)
        throw new Error("There must be a value for the content that needs to be saved.");

    if (typeof value === "string" &&
        (value === "" || value.trim() === ""))
        if (config.warn === true)
            console.warn("Warning: It is not recommended to use empty strings as storage values, although this is feasible.");

    return value;
}