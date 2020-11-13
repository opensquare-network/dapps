const { blake2AsHex } = require('@polkadot/util-crypto')

class BountyController {
  async getDescription(ctx) {
    const { hash } = ctx.params;

    const content = await ctx.db.Content.findOne({
      attributes: ['content'],
      where: { hash },
      raw: true
    })

    if (!content) {
      ctx.status = 404;
      ctx.body = { error: "not found" };
      return;
    }

    ctx.body = content
  }

  async saveBountyDescription(ctx) {
    const { description, hash } = ctx.request.body
    const expectDigest = blake2AsHex(description)

    if (hash !== expectDigest) {
      ctx.status = 400;
      ctx.body = { error: "Hash and description not match" };
      return;
    }

    const content = await ctx.db.Content.create({ hash, content: description })
    ctx.status = 201
    ctx.body = content
  }
}

module.exports = new BountyController()
