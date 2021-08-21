/* eslint-disable */
import axios from 'axios';
const API_DOMAIN = 'https://api.nytimes.com';
const API_KEY = 'TCA6F3ERSCl405KagmGI7MIe8rn2bu2U'
const API = {
    DataUrl: `${API_DOMAIN}/svc/books/v3/lists/current/`,
};

export function getBookList({list}) {
    return axios.get(`${API.DataUrl}${list}.json?api-key=${API_KEY}`);
}
