/**
 * 验证 key 的有效性。
 * @function _key
 * @param { string } key 键名。
 * @returns { string } 返回传入的键。
 * @throws { Error } 如果传入的值为空，将抛出错误。
 * @throws { Error } 如果键名的数据类型不是字符串类型，将抛出错误。
 * @throws { Error } 如果键名是空字符串，将抛出错误。
 */
export function _Key(key) {
    if (key === undefined || key === null)
        throw new Error("Please pass in valid key.");

    if (typeof key !== "string")
        throw new Error("The data type of the key must be a string.");

    if (typeof key === "string" && key.trim() === "")
        throw new Error("The key cannot be an empty string.");

    return key;
}