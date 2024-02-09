// config
import { config } from "./storage.config.js";

// main
import { StorageProvider } from "./function.js";

/* ========== */

const $Storage = new StorageProvider(config.storageType);

export { StorageProvider, $Storage }