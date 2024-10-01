import Cookies from 'js-cookie';

export function getCookie(name) {
    let cookie = {}
    if (typeof window === 'undefined') {
        // Read a cookie server-side
        cookie = require('next/headers').cookies().get(name).value;
    }else{
        cookie = Cookies.get(name);
    }

    try {
        return JSON.parse(cookie);
    }catch(e){
        return {};
    }

}
