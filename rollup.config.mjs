// 版本号
const version = "v1.0.3";

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
    input: "src/index.js",
    output: {
        file: `dist/StorageProvider.${version}.js`,
        format: "iife", // es or iife
        name: "StorageProvider"
    },
};