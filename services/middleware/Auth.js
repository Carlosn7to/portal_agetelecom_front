import Cookie from "js-cookie";
import {AXIOS} from "../api.ts";
import store from '@/store/index.js';

export default {
    auth(to, from, next) {
        const TOKEN = Cookie.get('token')

        AXIOS({
            method: "get",
            url: "validatedToken",
            headers: {
                'Authorization': 'Bearer '+TOKEN
            }
        })
            .then((res) => {
                if(res.data.status === true) {
                    sessionStorage.setItem('portal_permission', res.data.levelAccess)
                    return next()
                }

            }).catch(() => {
            return next({ path: '/'})
        })
    },
    management_portal(to, from, next) {
        const PERMISSION = sessionStorage.getItem('portal_permission')

        if(PERMISSION === 'Admin' || PERMISSION === 'Master') {
            return next()
        }

        return next({ path: '/sistemas'})

    },
    permission_report(to, from, next) {
        const TOKEN = Cookie.get('token')
        AXIOS({
            method: 'get',
            url: 'agerreport/Access',
            headers: {
                'Authorization': 'Bearer'+TOKEN
            }
        }).then(() => {
            // return next()
        }).catch(() => {
            alert('Você não pode acessar o sistema AgeReport.')
            return next({ path: '/sistemas'})
        })

    },
    permission_rv(to, from, next) {
        const TOKEN = Cookie.get('token')

        AXIOS({
            method: 'get',
            url: 'agerv/Access',
            headers: {
                'Authorization': 'Bearer'+TOKEN
            }
        }).then((res) => {
            store.commit('SAVE_PERMISSION', {permission: {system: 'ageRv', level: res.data.level, function: res.data.function}})
            return next()
        }).catch(() => {
            alert('Você não pode acessar o sistema AgeRv.')
            return next({ path: '/sistemas'})
        })
    }

}