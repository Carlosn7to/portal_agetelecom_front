import Cookie from "js-cookie";
import {AXIOS} from "../api.ts";

export default {
    auth(to, from, next) {
        const TOKEN = Cookie.get('token')
        console.log(TOKEN)

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
            url: 'permissions/systems',
            headers: {
                'Authorization': 'Bearer'+TOKEN
            },
            params: {
                sysName: 'AgeReport'
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
            url: 'permissions/systems',
            headers: {
                'Authorization': 'Bearer'+TOKEN
            },
            params: {
                sysName: 'AgeRv'
            }
        }).then(() => {
            return next()
        }).catch(() => {
            alert('Você não pode acessar o sistema AgeRv.')
            return next({ path: '/sistemas'})
        })
    }

}