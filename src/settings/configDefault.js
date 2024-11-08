/* 默认配置 */

// 导入依赖
import { typeCreator } from "./configTypeCreator.js";

// 导出默认配置
export const configDefault = (typeObj => {
    const defaults = {};

    for (const key in typeObj) {
        if (typeObj.hasOwnProperty(key)) {
            const property = typeObj[key];
            defaults[key] = property.defaultValue;
        }
    }

    return defaults
})(typeCreator);