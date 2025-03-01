/* 数字验证器工厂函数 */


import { isNumber } from "../../type/checkType";


/* ========== */


type ComparatorFunction = (val: number, num: number, operator?: string) => boolean;


/* ========== */


/**
 * 数字验证器工厂函数
 * @function numberFactory
 * @param { Array<string> } conditions 数字需要满足的条件数组，例如 [">0", "<=5"]
 * @param { string } errorMessage 验证失败时的错误信息
 * @returns { { validator: (value: any) => boolean, errorMessage: string } } 包含数字验证器和错误信息的对象
 */
export const numberFactory = (
    conditions: Array<string>,
    errorMessage: string
): {
    validator: (value: any) => boolean,
    errorMessage: string
} => {
    function validator(value: any): boolean {
        if (!isNumber(value) || !Number.isInteger(value)) return false;

        const compareFunctions: { [key: string]: ComparatorFunction } = {
            ">": (val, num) => val > num,
            "<": (val, num) => val < num,
            ">=": (val, num) => val >= num,
            "<=": (val, num) => val <= num,
            "=": (val, num) => val == num,
            "==": (val, num) => val === num,
            "!=": (val, num) => val !== num,
            default: (_val, _num, operator) => {
                console.error(`Unsupported operator: ${operator}.`);
                return false;
            }
        };

        return conditions.every((condition: string): boolean => {
            const regex = /(>|<|>=|<=|=|==|!=)(\d+)/;
            const match = condition.match(regex);

            if (!match) {
                console.error(`Invalid condition format: ${condition}. It should match the regex pattern.`);
                return false;
            }

            const [, operator, numberStr] = match;
            const number: number = parseInt(numberStr, 10);
            const compareFunction: ComparatorFunction = compareFunctions[operator] || compareFunctions.default;

            return compareFunction(value, number, operator);
        });
    };

    return { validator, errorMessage }
}



