const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const config = require('../config')
const reviews = require('./reviews.json')
const ObjectId = require('mongodb').ObjectId
const stays = require('./stay.json')
const currentStays = require('./stays.json')
const { omit, map, find, transform } = require('lodash')
module.exports = {
    getCollection
}

// Database Name
const dbName = 'stay_db'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const refactorReviews = async () => {
    await connect()
    const reviewsCollection = await getCollection('review')
    const staysCollection = await getCollection('stay')
    // await staysCollection.deleteMany({})
    //const staysArr = await staysCollection.find().toArray()

    await staysCollection.insertMany(
        transform(
            currentStays,
            (res, stay) => {
                const oldStay = find(stays, { name: stay.name })
                if (!oldStay) {
                    return
                }
                res.push({
                    ...stay,
                    _id: new ObjectId(stay._id),
                    amenities: oldStay.amenities
                })
            },
            []
        )
    )

    console.log('done')
    // console.log('done')
    // // const stays = await staysCollection.find().toArray()
    // // await staysCollection.deleteMany()
    // await fs.writeFile('stays.json', JSON.stringify(staysArr), () =>
    //     console.log('done')
    // )

    // const newReviews = reviews.map((review) => ({
    //     ...review,
    //     rating: {
    //         cleanliness: randomIntFromInterval(1, 5),
    //         communication: randomIntFromInterval(1, 5),
    //         checkin: randomIntFromInterval(1, 5),
    //         accuracy: randomIntFromInterval(1, 5),
    //         location: randomIntFromInterval(1, 5),
    //         value: randomIntFromInterval(1, 5)
    //     },
    //     _id: new ObjectId(review._id),
    //     byUserId: new ObjectId(review.byUserId),
    //     stayId: new ObjectId(review.stayId)
    // }))
    // await reviewsCollection.insertMany(newReviews)
    // console.log('done')
    // console.log(newReviews[0])
    // const reviews = await reviewsCollection.find({}).toArray()
    // // console.log(reviews)
    // await fs.writeFile('reviews.json', JSON.stringify(reviews), () =>
    //     console.log('done')
    // )
    return
}
//refactorReviews()
