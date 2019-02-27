import Vue from 'vue'

export const userKey = '__ivc_capa_user'
export const baseApiUrl = 'http://localhost:3333'
export const baseUrl = window.location.host

export function showError(e) {
    if (e && e.response && e.response.data) {
        let message = e.response.data
        if (_.isObject(message)) {
            message = message.message
        }
        //Vue.toasted.global.defaultError({ msg: message })
        Vue.$awn.success(message)
    } else if (typeof e === 'string') {
        //Vue.toasted.global.defaultError({ msg: e })
        Vue.$awn.success(e)
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey, baseUrl }
