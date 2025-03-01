import { objKeys } from "../var/objKeys.js"; // 获取对象所有键
import { typeValidator } from "./typeValidator.js"; // 类型验证器

/**
 * 所有类型
 */
export const allTypes = objKeys(typeValidator);