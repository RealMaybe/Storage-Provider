import { StorageProvider } from "./Storage";
import { isCircular } from "./checker/isCircular";
import { haveSameKeys } from "./validate/objectHaveSameKeys";


/* ========== */


// 导出
export {
    StorageProvider as default, // StorageProvider 类
    isCircular, // 检查对象是否为循环引用
    haveSameKeys as objectHaveSameKeys // 检查两个对象是否拥有相同的键
};