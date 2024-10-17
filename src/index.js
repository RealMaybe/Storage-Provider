import { StorageProvider } from "./Storage.js";

const $local = new StorageProvider({ storageType: "local", warn: true });
const $session = new StorageProvider({ storageType: "session", warn: true });

export {
    $local,
    $session,
    StorageProvider as default
}