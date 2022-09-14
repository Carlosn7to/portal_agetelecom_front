import VueAxios from 'axios'

export const AXIOS = VueAxios.create({
    baseURL: `https://v1.ageportal.agetelecom.com.br/api/`,
    //baseURL: `http://localhost:8000/api/`,

})