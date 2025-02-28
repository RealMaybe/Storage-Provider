// 导入依赖
import StorageProvider from "../src/index.js";

/* ========== */

export const localProvider = new StorageProvider({
    storageType: "local",
    warn: true,
    circular: true,
    monitor: true,
});