// 版本号
const version = "v0.1.3";

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
    input: "src/index.js",
    output: {
        file: `dist/StorageProvider.${version}.js`,
        format: "es",
    },
};