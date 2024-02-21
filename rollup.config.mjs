/**
 * @type { import('rollup').RollupOptions }
 */
const version = "0.1.1";

export default {
    input: "src/index.js",
    output: {
        file: `dist/StorageProvider.${version}.js`,
        format: "es",
    },
};