// config
import { config } from "./config/settings/storage.config.js";

// main
import { StorageProvider } from "./storage.js";

/* ========== */

const $local = new StorageProvider(config),
    $session = new StorageProvider({...config, type: "session" });

export {
    StorageProvider, // 导出主函数（无配置，直接使用须要手动配置）
    $local, // 导出配置好的 local 方法
    $session // 导出配置好的 session 方法
}