// config
import { type } from "./var/type.js";

// main
import { StorageProvider } from "./function.js";

/* ========== */

const $local = new StorageProvider(type),
    $session = new StorageProvider("session");

export {
    StorageProvider, // 导出主函数
    $local, // 导出默认主方法
    $session // 导出重置主方法
}