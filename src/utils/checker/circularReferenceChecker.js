/**
 * 判断一个对象是否包含对自身的嵌套引用。
 * 
 * @function _circularReferenceChecker
 * @param { object | Array } obj 要检查的对象。
 * @param { Set } [seen=new Set()] 用于跟踪已经检查过的对象的集合，默认为空集合。
 * @returns { boolean } 如果对象包含对自身的嵌套引用，则返回 true，否则返回 false。
 */
export function _circularReferenceChecker(obj, seen = new Set()) {
    if (typeof obj !== "object" || obj === null)
        return false;

    if (seen.has(obj))
        return true;

    seen.add(obj);

    for (const key in obj)
        if (_circularReferenceChecker(obj[key], seen))
            return true;

    return false;
}