/**
 * 验证数组有效性。
 * @function _Array
 * @param { Array } arr - 数组。
 * @param { string } type - 需要的数据类型。
 * @returns { Array } - 返回传入的数组。
 * @throws { Error } - 如果输入参数不是数组，将抛出错误。
 * @throws { Error } - 如果数组为空，将抛出错误。
 * @throws { Error } - 如果数组中的所有项不是字符串，将抛出错误。
 */
export function _Array(arr, type) {
    if (!Array.isArray(arr))
        throw new Error("Input parameter must be an array.")

    if (arr.length === 0)
        throw new Error("A valid item must exist in the array.")

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== type)
            throw new Error(`All items in the array must be ${type}s.`);
    }

    return arr
}