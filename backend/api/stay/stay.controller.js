const { inRange } = require('lodash')
const { info } = require('../../services/logger.service')
const logger = require('../../services/logger.service')
const stayService = require('./stay.service')

// GET LIST
async function getStays(req, res) {
    let filterBy = {
        priceRange: [0, Infinity],
        bedrooms: null,
        beds: null,
        bathrooms: null,
        propertyTypes: {},
        placeTypes: {},
        amenities: {},
        labels: ''
    }

    try {
        logger.debug('Getting Stays')
        var params = req.query.params

        if (params) {
            params = JSON.parse(params)

            filterBy = {
                priceRange: params.priceRange,
                bedrooms: params.bedrooms,
                bathrooms: params.bathrooms,
                beds: params.beds,
                propertyTypes: params.propertyTypes,
                placeTypes: params.placeTypes,
                amenities: params.amenities,
                labels: params.labels,
                hostId: params.hostId
            }
            // if (!filterBy.priceRange[1]) filterBy.priceRange[1] = Infinity
            if (filterBy.priceRange && !filterBy.priceRange[1])
                filterBy.priceRange[1] = Infinity
        }
        const stays = await stayService.query(filterBy)
        res.json(stays)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

// GET BY ID
async function getStayById(req, res) {
    try {
        const stayId = req.params.id
        const stay = await stayService.getById(stayId)
        res.json(stay)
    } catch (err) {
        logger.error('Failed to get stay', err)
        res.status(500).send({ err: 'Failed to get stay' })
    }
}

// POST (add stay)
async function addStay(req, res) {
    try {
        const stay = req.body
        const addedStay = await stayService.add(stay)
        res.json(addedStay)
    } catch (err) {
        logger.error('Failed to add stay', err)
        res.status(500).send({ err: 'Failed to add stay' })
    }
}

// PUT (Update stay)
async function updateStay(req, res) {
    try {
        const stay = req.body
        const updatedStay = await stayService.update(stay)
        res.json(updatedStay)
    } catch (err) {
        logger.error('Failed to update stay', err)
        res.status(500).send({ err: 'Failed to update stay' })
    }
}

// DELETE (Remove Stay)
async function removeStay(req, res) {
    try {
        const stayId = req.params.id
        const removedId = await stayService.remove(stayId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove stay', err)
        res.status(500).send({ err: 'Failed to remove stay' })
    }
}

module.exports = {
    getStays,
    getStayById,
    addStay,
    updateStay,
    removeStay
}
