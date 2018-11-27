module.exports.storeFactory = async (url, database) => {
  const { MongoClient } = require('mongodb'); //eslint-disable-line
  const client = await MongoClient.connect(url);
  const db = client.db(database);
  const collection = db.collection('trainers');

  return {
    get: async (id) => {
      const data = await collection.findOne({ id });

      return data;
    },
    create: async (data) => {
      if (!data.id) {
        throw new Error('data does not have an id property');
      }

      await collection.insert(data);
    },
  };
};
