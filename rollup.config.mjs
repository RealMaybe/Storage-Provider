// 版本号
const version = "v1.0.3";
const mod = "iife"; // es or iife

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
    input: "src/index.js",
    output: {
        file: `dist/StorageProvider.${version}.${mod}.js`,
        format: mod,
        name: "StorageProvider"
    },
};