const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/app/.env' });
(async () => {
  const c = new MongoClient(process.env.MONGO_URL);
  await c.connect();
  const db = c.db(process.env.DB_NAME);
  for (const col of ['blog_posts', 'gallery_items', 'products']) {
    const r = await db.collection(col).deleteMany({});
    console.log('cleared', col, r.deletedCount);
  }
  await c.close();
})();
