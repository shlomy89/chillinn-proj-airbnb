const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const config = require("../config");
const reviews = require("./reviews.json");
const ObjectId = require("mongodb").ObjectId;
const stays = require("./stays.json");
const currentStays = require("./stays.json");
const { omit, map, find, transform } = require("lodash");
module.exports = {
  getCollection,
};

// Database Name
const dbName = "stay_db";

var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log("errorrrrr");
    logger.error("Failed to get Mongo collection", err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    logger.error("Cannot Connect to DB", err);
    throw err;
  }
}
