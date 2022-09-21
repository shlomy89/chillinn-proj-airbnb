import { httpService } from './http.service'

export const stayService = {
    query,
    save,
    remove,
    getById,
    setStaysToLocalStrage,
    loadStaysFromLocalStorage
    // getNextId
}

const STORAGE_KEY = 'stays'
const BASE_URL = `stay/`

async function query(filterBy = {}) {
    const res = await httpService.get(BASE_URL, { params: filterBy })
    return res
}

async function getById(stayId) {
    const res = await httpService.get(BASE_URL + stayId)
    return res
}

async function remove(stayId) {
    const res = await httpService.get(BASE_URL + stayId)
    return res
}

async function save(stay) {
    const staySaved = await httpService.get(BASE_URL)
    if (staySaved._id) {
        const res = await httpService.put(BASE_URL + stay._id, stay)
        return res
    }
    const res = await httpService.post(BASE_URL, stay)
    return res
}

function loadStaysFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}

function setStaysToLocalStrage(stays) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
}

// function getNextId(stayId) {
//     return httpService.get(BASE_URL)
//         .then(stays => {
//             const stayIdx = stays.findIndex(stay => stay._id === stayId)
//             const nextStayIdx = stayIdx + 1 === stays.length ? 0 : stayIdx + 1
//             return stays[nextStayIdx]._id
//         })
// }
