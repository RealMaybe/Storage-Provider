import StorageProvider from "../dist/es/StorageProvider.es.1.1.2";

/* ========== */

const localProvider = new StorageProvider({
    type: "local",
    warn: true,
    monitor: true,
    circular: true,
    original: true,
});

// const req = localProvider.getAll();

console.log(localProvider);