/* 检查器 */

/* ========== */

// 对象循环引用验证
import { _circularReferenceChecker } from "../utils/checker/circularReferenceChecker.js";

// 本地存储合计大小
import { _getStorageSize } from "../utils/size/storageSize.js";

/* ========== */

export {
    _circularReferenceChecker, // 对象循环引用验证
    _getStorageSize // 本地存储合计大小
}