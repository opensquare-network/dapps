const routes = [
  require('./features/bounty/routes'),
]

module.exports = app => {
  for (const route of routes) {
    app
      .use(route.routes())
      .use(route.allowedMethods({ throw: true }))
  }
}
