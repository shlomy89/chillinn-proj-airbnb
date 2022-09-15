import { storageService } from './async-storage.service.js'

export const stayService = {
    query,
    save,
    remove,
    getById,
}

const STORAGE_KEY = 'stay'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
]

const gDefaultStays = [
    {
        city: "Helsinki",
        country: "Finland",
        superHost: false,
        title: "Stylist apartment in center of the city",
        rating: 4.4,
        maxGuests: 3,
        type: "Entire apartment",
        beds: 2,
        photo:
            "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80",
    },
    {
        city: "Turku",
        country: "Finland",
        superHost: false,
        title: "Nice apartment in center of Turku",
        rating: 4.2,
        maxGuests: 5,
        type: "Entire apartment",
        beds: 3,
        photo:
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    },
    {
        city: "Helsinki",
        country: "Finland",
        superHost: true,
        title: "Arty interior in 1900 wooden house",
        rating: 4.5,
        maxGuests: 10,
        type: "Entire house",
        beds: 6,
        photo:
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    },
]

function query(filterBy) {
    return storageService.query(STORAGE_KEY).then((stays) => {
        if (!stays || !stays.length) {
            storageService.postMany(STORAGE_KEY, gDefaultStays)
            stays = gDefaultStays
        }

        if (filterBy) {
            const { name, minPrice } = filterBy

            if (name) {
                const regex = new RegExp(name, 'i')
                stays = stays.filter((stay) => regex.test(stay.name))
            }

            if (minPrice) {
                stays = stays.filter((stay) => stay.price >= minPrice)
            }
        }
        return stays
    })
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

function remove(stayId) {
    return storageService.remove(STORAGE_KEY, stayId)
}

function save(stay) {
    if (stay._id) {
        return storageService.put(STORAGE_KEY, stay)
    } else {
        stay.inStock = true
        stay.createdAt = Date.now()
        stay.labels = []
        return storageService.post(STORAGE_KEY, stay)
    }
}