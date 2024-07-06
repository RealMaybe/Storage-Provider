/**
 * 验证 key 的有效性。
 * 
 * @function $Key
 * 
 * @param { String } key 需要验证的键名
 * @returns { String } 返回验证过后的键
 * 
 * @throws { Error } 如果传入的值为空，将抛出错误
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误
 * @throws { Error } 如果键名是空字符串，将抛出错误
 */
export function $Key(key, tips = "key") {
    if (key === undefined || key === null)
        throw new Error(`Please pass in valid ${tips}.`);

    if (typeof key !== "string")
        throw new Error(`The data type of the ${tips} must be a string.`);

    if (typeof key === "string" && key.trim() === "")
        throw new Error(`The ${tips} cannot be an empty string.`);

    return key;
}