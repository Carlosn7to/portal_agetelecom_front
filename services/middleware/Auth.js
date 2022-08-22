import Cookie from "js-cookie";
import {AXIOS} from "../api.ts";
const TOKEN = Cookie.get('token')

export default {
    auth(to, from, next) {

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
    permission_report() {
        AXIOS({
            method: 'get',
            url: 'permissions/systems',
            headers: {
                'Authorization': 'Bearer'+TOKEN
            }
        }).then((res) => {
            console.log(res)
        })

    }

}