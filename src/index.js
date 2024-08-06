import { Recommended } from "./settings/Settings.js";
import { StorageProvider } from "./Storage.js";

/* ========== */

const $local = new StorageProvider(Recommended),
    $session = new StorageProvider({...Recommended, type: "session" });

export {
    $local, // 导出配置好的 local 方法
    $session, // 导出配置好的 session 方法
    StorageProvider as default // 导出主函数作为默认导出
}