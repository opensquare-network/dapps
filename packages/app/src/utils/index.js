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
