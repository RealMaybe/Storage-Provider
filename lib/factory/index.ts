// import { booleanFactory } from "./booleanFactory";
// import { numberFactory } from "./numberFactory";
// import { stringFactory } from "./stringFactory";
// import { createConfigFactory } from "./createConfigFactory";

// const obj = {// 是否加密
//     encrypt: createConfig(
//         "boolean",
//         false,
//         booleanValidator("encrypt"),
//         false
//     ),
//     // 是否压缩
//     compress: createConfig(
//         "boolean",
//         false,
//         booleanValidator("compress"),
//         false
//     ),
//     // 过期时间
//     expirationTime: createConfig(
//         "number",
//         false, {
//         validator: value => {
//             if (typeof value !== "number" || value <= 0) return false;
//             const currentTime = Date.now();
//             const tenMinutesLater = currentTime + (60 * 1000 * 10);
//             return value > tenMinutesLater;
//         },
//         errorMessage: `The "expirationTime" property value is invalid. It must be a timestamp representing a time at least ten minutes in the future.`
//     }, null),
//     // 存储时间
//     storageTime: createConfig(
//         "number",
//         false, {
//         validator: value => typeof value === "number" && value > 0,
//         errorMessage: "Invalid time. It must be a positive number."
//     }, null)
// }