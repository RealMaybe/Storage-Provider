/* 默认配置 */

// 导入依赖
import { type TypeClassConfigDefaultValueTypes } from "../type/typeClassConfig";
import { typeCreator } from "./configTypeCreator";

// 导出默认配置
export const configDefault: TypeClassConfigDefaultValueTypes = Object.keys(typeCreator)
    .reduce((defaults, key) => {
    defaults[key] = typeCreator[key].defaultValue;
    return defaults;
}, {} as TypeClassConfigDefaultValueTypes);