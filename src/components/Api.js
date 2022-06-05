import axios from "axios";

axios.defaults.baseURL = 'http://library.erimo.ir';


export function post(url, data) {
    return axios.post(url, data)
        .then(res => res.data)
        .catch(error => console.log(error))
}
export function put(url, data, config) {
    return axios.put(url, data, config)
        .then(res => res.data)
        .catch(error => console.log(error))
}
export function remove(url, config) {
    return axios.delete(url, config)
        .then(res => res.data)
        .catch(error => console.log(error))
}

export function get(url, config = {}) {
    return axios.get(url, config)
        .then(res => res.data)
        .catch(error => console.log(error))
}