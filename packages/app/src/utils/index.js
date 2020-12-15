import BigNumber from "bignumber.js";

export function toPrecision(value, precision = 0, paddingZero = true) {
  precision = Number(precision)
  const big = new BigNumber(value).dividedBy(Math.pow(10, precision))

  if (paddingZero) {
    return big.toFixed(precision)
  } else {
    return big.toNumber()
  }
}

export function makeCancelable(promise) {
  let isCanceled = false
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val =>
        isCanceled ? reject(new Error({ isCanceled })) : resolve(val)
      )
      .catch(error =>
        isCanceled ? reject(new Error({ isCanceled })) : reject(error)
      )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true
    }
  }
}

export function isHex(str) {
  return (str + '').startsWith('0x')
}

export function shortHash(hash = '', length = 5) {
  if (!isHex(hash)) {
    return hash
  }

  const nakedHash = remove0x(hash)
  return `0x${nakedHash.slice(0, length)}...${nakedHash.slice(nakedHash.length - length)}`
}

export function remove0x(str) {
  if (!isHex(str)) {
    return str
  }

  return str.slice(2)
}

export function shortStr(str = '', length = 5) {
  if (str.length <= 2 * length) {
    return str
  }

  return `${str.slice(0, length)}...${str.slice(str.length - length)}`
}

export function elemIn(elem, arr) {
  return arr.indexOf(elem) >= 0
}

export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}
