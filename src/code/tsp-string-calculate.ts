// const expr = "100*2**4";
// const result = eval(expr); // 1600

export function stringCalculate(str: string) {
    return Function(`"use strict"; return (${str})`)();
}

