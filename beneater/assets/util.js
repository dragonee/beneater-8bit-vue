const promisifyTimeout = (timeout) => new Promise(
    (resolve) => setTimeout(resolve, timeout),
);

const offsetToAddr = (offset, num = 4) => Array(num).fill(false).map(
    (val, index) => !!((1 << index) & offset),
);

// Create numeric address from array of true/false values
// e.g. [t,f,t] becomes 5
const addrToOffset = (arr) => arr.reduce(({ sum, power }, val) => ({
    sum: sum + power * (val ? 1 : 0),
    power: power * 2,
}), { sum: 0, power: 1 }).sum;

export { promisifyTimeout, offsetToAddr, addrToOffset };
