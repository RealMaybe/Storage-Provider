/**
 * 用于验证 value 的有效性。
 * @function _Value
 * @param { * } value 存储值。
 * @returns { string } 返回传入的键。
 * @throws { Error } 如果传入的值为空，将抛出错误。
 */
export function _Value(value) {
    if (value === undefined || value === null)
        throw new Error("There must be a value for the content that needs to be saved.");

    return value;
}