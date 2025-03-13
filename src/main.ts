import {
    isCircular
} from "../lib/main";

/* ========== */

const val: any = {
    a: 1,
};

val.b = val;

console.log(isCircular(val, !0));