/* 默认配置 */

// 导入依赖
import { typeCreator } from "./configTypeCreator.js";

// 导出默认配置
export const configDefault = Object.keys(typeCreator)
    .reduce((defaults, key) => {
        defaults[key] = typeCreator[key].defaultValue;
        return defaults;
    }, {});