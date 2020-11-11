import blake2AsHex from "@polkadot/util-crypto/blake2/asHex";

export function newBounty(owner, token, payment, title, content) {
  const digest = blake2AsHex(content)

  return {
    V1: {
      owner,
      currencyId: {
        [token]: null
      },
      payment,
      title,
      digest
    }
  }
}
