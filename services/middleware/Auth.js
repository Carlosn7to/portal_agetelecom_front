import Cookie from "js-cookie";
import {AXIOS} from "../api.ts";

export default {

    auth(to, from, next) {
        const token = Cookie.get('token')

        AXIOS({
            method: "get",
            url: "validatedToken",
            headers: {
                'Authorization': 'Bearer '+token
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
    admin(to, from, next) {
        const level = Cookie.get('level')

        if(level === '2') {
            return next()
        }

        return next({ path: '/sem-acesso'})

    },
    report(to, from, next) {
        const level = Cookie.get('level')

        if(level === '3') {
            return next()
        }

        return next({ path: '/sem-acesso'})

    }
}