const { blake2AsHex } = require('@polkadot/util-crypto')
const { getContentCollection } = require('../../mongo')

class BountyController {
  async getDescription(ctx) {
    const { hash } = ctx.params;

    const col = await getContentCollection()
    const row = await col.findOne({ hash })

    if (!row) {
      ctx.status = 404;
      ctx.body = { error: "not found" };
      return;
    }

    ctx.body = row
  }

  async saveBountyDescription(ctx) {
    const { description, hash } = ctx.request.body
    const expectDigest = blake2AsHex(description)

    if (hash !== expectDigest) {
      ctx.status = 400;
      ctx.body = { error: "Hash and description not match" };
      return;
    }

    const col = await getContentCollection()
    const result = await col.findOneAndUpdate({ hash }, { $set: { content: description } },
      {
        upsert: true
      }
    )

    if (result.result && !result.result.ok) {
      ctx.status = 500;
      ctx.body = { error: "DB insertion failed" };
      return;
    }

    ctx.status = 201
    ctx.body = {
      hash, content: description
    }
  }
}

module.exports = new BountyController()
