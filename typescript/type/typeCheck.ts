// 循环引用检查结果
export type CheckCircularResult = {
    isCircular: boolean, // 是否循环
    warning: string | null, // 警告信息，可以是字符串或null
    value: { [key: string]: any } | Array<any> // 值，可以是任意类型的对象或数组  
};