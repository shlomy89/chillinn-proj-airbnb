import { httpService } from './http.service'


export const stayService = {
    query,
    save,
    remove,
    getById,
    setStaysToLocalStrage,
    loadStaysFromLocalStorage,
}

const STORAGE_KEY = 'stays'
const BASE_URL = `stay/`

async function query(filterBy = {}) {
    return httpService.get(BASE_URL, { params: filterBy })
    .then((res) => res)
}

function getById(stayId) {
    return httpService.get(BASE_URL + stayId)
    .then((res) => res)
}

async function remove(stayId) {
    return httpService.delete(BASE_URL + stayId)
    .then((res) => res)
}

async function save(stay) {
    if (stay._id) return httpService.put(BASE_URL + stay._id, stay)
    .then((res) => res)
    return httpService.post(BASE_URL, stay).then((res) => res)
}

function loadStaysFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}

function setStaysToLocalStrage(stays) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
}

// function getStayLabels(stays) {
//     const labels = stays.map(({ labels }) => labels)
//     return [...new Set(labels)]
// }

// function getNextId(stayId) {
//     return httpService.get(BASE_URL)
//         .then(stays => {
//             const stayIdx = stays.findIndex(stay => stay._id === stayId)
//             const nextStayIdx = stayIdx + 1 === stays.length ? 0 : stayIdx + 1
//             return stays[nextStayIdx]._id
//         })
// }