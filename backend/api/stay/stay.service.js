const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

// const PAGE_SIZE = 5

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        console.log('criteria:', criteria);
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find().toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = await collection.findOne({ _id: stayId })
        console.log('stay:', stay);
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    stay.createdAt = Date.now()
    stay.inStock = true
    try {
        const collection = await dbService.getCollection('stay')
        const addedStay = await collection.insertOne(stay)
        return addedStay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        var id = ObjectId(stay._id)
        delete stay._id
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: id }, { $set: { ...stay } })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    const { priceRange, bedrooms, propertyTypes, placeTypes, amenities } = filterBy
    const [minPrice, maxPrice] = priceRange

    const chosePropertyTypes = Object.keys(propertyTypes).filter((p) => propertyTypes[p])
    const checkedPlaceTypes = Object.keys(placeTypes).filter((p) => placeTypes[p])
    const checkedAmenities = Object.keys(amenities).filter((a) => amenities[a])

    if (chosePropertyTypes.length) {
        // stays = stays.filter((stay) =>
        //     chosePropertyTypes.some(
        //         (chosePropertyType) =>
        //             chosePropertyType === stay.propertyType
        //     )
        // )
        criteria.propertyType = { $in: chosePropertyTypes } 
    }
    
    if (checkedPlaceTypes.length) {
        // stays = stays.filter((stay) =>
        //     checkedPlaceTypes.some(
        //         (checkedPlaceType) => checkedPlaceType === stay.placeType
        //     )
        // )
        criteria.placeType = { $in: checkedPlaceTypes } 
    }

    if (minPrice) {
        // stays = stays.filter((stay) => stay.price >= minPrice)
        criteria.price = { $gte: minPrice }
    }

    if (maxPrice) {
        // stays = stays.filter((stay) => stay.price <= maxPrice)
        criteria.price = { $lte: maxPrice }
    }

    if (bedrooms) {
        // stays = stays.filter((stay) => stay.bedrooms === bedrooms)
        criteria.bedrooms = { $eq: bedrooms }

    }

    // stays = stays.filter((stay) =>
    //     checkedAmenities.every((amenity) =>
    //         stay.amenities.includes(amenity)
    //     )
    // )
    criteria.amenities = { $all: checkedAmenities } 
    
    return criteria
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text
}

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}