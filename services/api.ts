import VueAxios from 'axios'

export const AXIOS = VueAxios.create({
    baseURL: `http://v1.portal.tote.local/api/`,
    //baseURL: `http://localhost:8000/api/`,

})