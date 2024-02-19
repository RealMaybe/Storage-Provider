const path = require("path");

module.exports = {
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