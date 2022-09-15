// import { httpService } from './http.service'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from '../services/user.service.js'


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

const STORAGE_KEY = 'stays'
// const stayChannel = new BroadcastChannel('stayChannel')


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
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
        // stay.owner = userService.getLoggedinUser()
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