/* 参数方法 */

/* ========== */

// Array 有效性验证
import { $Array } from "../utils/parameter/Array.js";

// Key 有效性验证
import { $Key } from "../utils/parameter/Key.js";

// 查验对象是否为非空对象
import { $Object } from "../utils/parameter/Object.js";

// value 有效性验证
import { $Value } from "../utils/parameter/Value.js";

/* ========== */

/* 导出所有方法 */
export {
    $Array, // 数组 有效性验证
    $Key, // 键 有效性验证
    $Object, // 对象 有效性验证
    $Value // 值 有效性验证
}