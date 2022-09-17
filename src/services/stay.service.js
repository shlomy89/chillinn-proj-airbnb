// import { httpService } from './http.service'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from '../services/user.service.js'

export const stayService = {
    query,
    save,
    remove,
    getById,
    // getNextId,
    loadStaysFromLocalStorage,
    setStaysToLocalStrage,
    // avgPriceByLabels,
    // avgLabelsByStock,
    // getEmptyStay,
    getStayLabels
}

const gStays = [
    {
        _id: 10006546,
        name: 'Ribeira Charming Duplex1',
        propertyType: 'House',
        placeType: 'Entire place',
        bedrooms: 3,
        price: 60,
        imgUrls: [
            'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43161516/original/1acde0cf-3363-44d8-a707-59403ed74442.jpeg?im_w=720'
        ],
        price: 80.0,
        summary:
            'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
        capacity: 8,

        amenities: [
            'TV',
            'Wifi',
            'Kitchen',
            'Dryer',
            'Washer',
            'Air conditioning',
            'Heating',
            'Iron',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics'
        ],

        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Porto',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413
        }
    },
    {
        _id: 10006547,
        name: 'Ribeira Charming Duplex2',
        propertyType: 'Apartment',
        placeType: 'Privet room',
        bedrooms: 5,
        imgUrls: [
            'https://a0.muscache.com/im/pictures/63befe3b-264a-4082-ab8d-7b0681b91955.jpg?im'
        ],
        price: 70,
        summary:
            'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
        capacity: 8,

        amenities: [
            'TV',
            'Wifi',
            'Kitchen',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics'
        ],

        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Porto',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413
        }
    },
    {
        _id: 10006548,
        name: 'Ribeira Charming Duplex3',
        propertyType: 'Guesthouse',
        placeType: 'Shared room',
        bedrooms: 6,
        imgUrls: [
            'https://a0.muscache.com/im/pictures/miso/Hosting-3524556/original/24e9b114-7db5-4fab-8994-bc16f263ad1d.jpeg?im_w=720'
        ],
        price: 80,
        summary:
            'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
        capacity: 8,

        amenities: [
            'TV',
            'Wifi',
            'Kitchen',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics'
        ],

        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Porto',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413
        }
    },
    {
        _id: 10006549,
        name: 'Ribeira Charming Duplex4',
        propertyType: 'Hotel',
        placeType: 'Entire place',
        bedrooms: 2,
        imgUrls: [
            'https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/253bfa1e-8c53-4dc0-a3af-0a75728c0708.jpeg?im_w=720'
        ],
        price: 90,
        summary:
            'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
        capacity: 8,

        amenities: [
            'TV',
            'Wifi',
            'Kitchen',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics'
        ],

        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Porto',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413
        }
    }
]

const STORAGE_KEY = 'stays'
// const stayChannel = new BroadcastChannel('stayChannel')

function query(filterBy) {

    return storageService.query(STORAGE_KEY).then((stays) => {

        if (!stays || !stays.length) stays = gStays
        storageService.postMany(STORAGE_KEY, stays)

        if (filterBy) {
            let { minPrice, maxPrice, bedrooms, propertyType, placeType, amenities } = filterBy
            console.log("returnstorageService.query ~ filterBy", filterBy)

            if (propertyType) {
                const regex = new RegExp(propertyType, 'i')
                stays = stays.filter((stay) => regex.test(stay.propertyType))
            }

            if (placeType) {
                const regex = new RegExp(placeType, 'i')
                stays = stays.filter((stay) => regex.test(stay.placeType))
            }

            if (minPrice) {
                stays = stays.filter((stay) => stay.price >= minPrice)
            }

            if (maxPrice) {
                stays = stays.filter((stay) => stay.price <= maxPrice)
            }

            if (bedrooms) {
                stays = stays.filter((stay) => stay.bedrooms === bedrooms)
            }

            if (amenities) {
                stays = stays.filter((stay) => amenities.every(amenity => stay.amenities.includes(amenity)))
            }
        }
        return stays
    })
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
    // return axios.get(`/api/stay/${stayId}`)
}

// function getNextId(stayId) {
//     return storageService.get(STORAGE_KEY)
//         .then(stays => {
//             const stayIdx = stays.findIndex(stay => stay._id === stayId)
//             const nextStayIdx = stayIdx + 1 === stays.length ? 0 : stayIdx + 1
//             return stays[nextStayIdx]._id
//         })
// }

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
    // stayChannel.postMessage(getActionRemoveStay(stayId))
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
        // stayChannel.postMessage(getActionUpdateStay(savedStay))
    } else {
        // Later, owner is set by the backend
        stay.inStock = utilService.randomBoolean()
        savedStay = await storageService.post(STORAGE_KEY, stay)
        // stayChannel.postMessage(getActionAddStay(savedStay))
    }
    return savedStay
}

function loadStaysFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}

function setStaysToLocalStrage(stays) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
}

function getStayLabels(stays) {
    const labels = stays.map(({ labels }) => labels)
    return [...new Set(labels)]
}

// function getEmptyStay() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

// function avgPriceByLabels(stays) {
//     const avgPriceByLabels = []
//     const labels = getStayLabels(stays)
//     labels.forEach((label) => {
//         let totalLabelAppear = 0
//         const totalPriceSum = stays.reduce((acc, { price, labels: currLabel }) => {
//             if (currLabel === label) {
//                 totalLabelAppear++
//                 return acc + price
//             } else return acc
//         }, 0)
//         const avgPrice = totalPriceSum / totalLabelAppear
//         avgPriceByLabels.push({ [label]: avgPrice })
//     })
//     return avgPriceByLabels
// }

// function avgLabelsByStock(stays) {
//     const mapStock = {}
//     const mapCounterByLabel = {}

//     stays.map(stay => {
//         if (!mapCounterByLabel[stay.label]) {
//             mapStock[stay.label] = 0
//             mapCounterByLabel[stay.label] = 0
//         }
//         if (stay.inStock) mapStock[stay.label]++
//         mapCounterByLabel[stay.label]++
//     })
//     const percentageLabelsInStock = []
//     for (const label in mapStock) {
//         percentageLabelsInStock.push({ [label]: (mapStock[label] / mapCounterByLabel[label]) * 100 })
//     }
//     return percentageLabelsInStock
// }
