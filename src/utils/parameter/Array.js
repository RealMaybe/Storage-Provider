/**
 * 验证数组有效性。
 * 
 * @function $Array
 * 
 * @param { Array } arr 需要验证的数组
 * @param { string } type 需要的数据类型
 * @returns { Array } 返回验证过后的数组
 * 
 * @throws 抛出报错：输入参数不是数组
 * @throws 抛出报错：数组为空
 * @throws 抛出报错：数组中的所有项不是指定类型
 */
export function $Array(arr, type) {
    if (!Array.isArray(arr))
        throw new Error("Input parameter must be an array.")

    if (arr.length === 0)
        throw new Error("A valid item must exist in the array.")

    for (let i = 0; i < arr.length; i++)
        if (typeof arr[i] !== type)
            throw new Error(`All items in the array must be ${type}s.`);

    return arr
}