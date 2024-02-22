// 版本号
const version = "0.1.1"

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