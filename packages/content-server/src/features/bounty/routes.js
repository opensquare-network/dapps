const Router = require("koa-router");
const bountyController = require("./bounty.controller")

const router = new Router();
router.post("/content", bountyController.saveBountyDescription);
router.get("/content/:hash", bountyController.getDescription);

module.exports = router;
