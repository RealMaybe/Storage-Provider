// 版本号
const version = "1.1.0-bata";

// rollup 配置
export default {
    input: "src/index.js",
    output: {
        file: `dist/StorageProvider.${version}.js`,
        format: "iife",
        name: "StorageProvider"
    },
};