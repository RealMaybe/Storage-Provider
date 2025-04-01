/**
 * @description 检测结果类型
 * @type { Object }
*/
export type $inspector = {
    all: boolean,
    tips: {
        [storageKey: string]: string
    },
    errors: {
        [storageKey: string]: string
    }
};

/**
 * 从存储中获取多个值并根据指定的类型返回不同格式的结果
 * - type 的指定类型。
 */
export type OutputType = "array" | "object" | "array-object";
export type OutputResult<
    K extends string,
    T extends OutputType
> =
    T extends "array" ? Array<{ [P in K]: any }> :
    T extends "object" ? { [P in K]: any } :
    T extends "array-object" ? Array<{ key: K, value: any }> :
    never;