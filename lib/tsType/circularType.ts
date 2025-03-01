type CircularObject = {
    [key: string]: any
};

type CircularArray = Array<any>;

/**
 * 循环引用检查器需要查验的数据类型。
*/
export type CircularItem = CircularObject | CircularArray;

/**
 * 循环引用检查器的返回结果类型。
 */
export type CheckCircularResult = {
    isCircular: boolean,
    warning: string | null,
    value: any
};