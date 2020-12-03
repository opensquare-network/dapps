const { MongoClient } = require('mongodb')

const dbName = 'os-content'
const contentCollectionName = 'content'

let client = null
let db = null
let contentCol = null

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017'

async function initDb() {
  client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true
  })

  db = client.db(dbName)

  contentCol = db.collection(contentCollectionName)
  await _createIndexes()
}

async function _createIndexes() {
  if (!db) {
    console.error('Please call initDb first')
    process.exit(1)
  }

  // TODO: create indexes for DB collections
}

async function tryInit(col) {
  if (!col) {
    await initDb()
  }
}

async function getContentCollection() {
  await tryInit(contentCol)
  return contentCol
}

module.exports = {
  initDb,
  getContentCollection
}

