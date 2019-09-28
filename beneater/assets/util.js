const promisifyTimeout = (timeout) => new Promise(
    (resolve) => setTimeout(resolve, timeout)
) 

const offsetToAddr = (offset, num=4) => Array(num).fill(false).map(
    (val, index) => !!(Math.pow(2, index) & offset)
)

export { promisifyTimeout, offsetToAddr }