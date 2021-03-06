require("dotenv").config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const http = require("http");
const cors = require("@koa/cors");
const { initDb } = require('./mongo')

const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(cors())
  .use(helmet());
require("./routes")(app);

const server = http.createServer(app.callback());

initDb().then(() => {
  const port = process.env.SERVER_PORT || 4000;
  server.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
})
