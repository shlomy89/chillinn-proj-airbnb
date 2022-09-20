export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, delay = 800) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        return entities.find((entity) => entity._id === entityId)
    } catch (error) {
        console.log(error, 'get function failed')
    }
}

function postMany(entityType, entities) {
    _save(entityType, entities)
    return Promise.resolve(entities)
}

async function post(entityType, newEntity) {
    try {
        newEntity._id = _makeId()
        const entities = await query(entityType)
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    } catch (error) {
        console.log(error, 'post function failed')
    }
}

async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(
            (entity) => entity._id === updatedEntity._id
        )
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    } catch (error) {
        console.log(error, 'put function failed')
    }
}

async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex((entity) => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (error) {
        console.log(error, 'remove function failed')
    }
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
