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

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//
// const refactorReviews = async () => {
//   await connect();
//   // const stay = await getCollection('stay')
//   const staysCollection = await getCollection("stay");
//   // const stays = await staysCollection.find({}).toArray();
//   await staysCollection.insertMany(
//     map(stays, (stay) => ({
//       ...stay,
//       _id: new ObjectId(stay._id),
//       unavailableDats: [],
//     }))
//   );
//
//   console.log("done");
//   // fs.writeFile("stays.json", JSON.stringify(stays), () => {
//   //   console.log("done");
//   // });
// };
// refactorReviews();
