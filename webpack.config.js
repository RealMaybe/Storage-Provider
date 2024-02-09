const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "StorageProvider.js",
        library: {
            name: ["StorageProvider", "$Storage"],
            type: "window"
        },
        libraryTarget: "window"
    }
}