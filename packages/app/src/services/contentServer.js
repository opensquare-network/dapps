import blake2AsHex from "@polkadot/util-crypto/blake2/asHex";

export async function postContent(content) {
  const hash = blake2AsHex(content)
  const url = new URL('/content', process.env.REACT_APP_CONTENT_SERVER_URL)

  debugger
  const response = await window.fetch(url.href, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ hash, description: content })
  })

  const result = await response.json()
  return result.hash
}
