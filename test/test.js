// 导入依赖
import { localProvider } from "./init.js";

/* ========== */

/* let obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
};

obj.obj = obj; */

let newObj = localProvider.sendMsg({})

console.log(newObj)