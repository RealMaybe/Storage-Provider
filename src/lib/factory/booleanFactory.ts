/* 布尔值工厂函数 */


import { isBoolean } from "../../typeChecker";


/* ========== */


/**
 * 布尔值验证器工厂函数
 * @function booleanFactory
 * @param { string } name 属性名称
 * @returns { { validator: (value: any) => boolean, errorMessage: string } } 包含布尔值验证器和错误信息的对象
 */
export const booleanFactory = (name: string): {
    validator: (value: any) => boolean
    errorMessage: string;
} => ({
    validator: (value: any) => isBoolean(value),
    errorMessage: `The "${name}" property value is invalid. It must be true or false.`
});