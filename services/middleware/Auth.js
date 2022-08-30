import Cookie from "js-cookie";
import {AXIOS} from "../api.ts";

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
                if(res.data === 1) {
                    return next()
                }

            }).catch(() => {
            return next({ path: '/'})
        })
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
            return next()
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
            Cookie.set('agerv_permission', res.data.levelAccess, { expires: 1})
            return next()
        }).catch(() => {
            alert('Você não pode acessar o sistema AgeRv.')
            return next({ path: '/sistemas'})
        })
    }

}