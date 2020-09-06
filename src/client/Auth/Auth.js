import sha256 from 'js-sha256'

class Auth {
    constructor() {
        this.authenticated = false
    }

    async login(obj, cb) {
        // call db and validate
        // using ajax
        // if validated get session cookie
        const url = `http://192.168.1.106:3000/api/${obj.username}/${sha256(obj.password)}`
        try {
            let response = await fetch(url)
            if (response.status == '200') {
                console.log(response);
                this.authenticated = true;
                cb(true)
            } else {
                throw new Error(response.status + ' Bad auth')
            }
        } catch(err) {
            console.log(err, '-- Login');
            cb(false)
        }
    }

    register(obj, cb) {
        cb(true)
    }

    logout(cb) {
        this.authenticated = false;
        cb()
    }

    isAuthenticated() {
        // valid cookie and authenticated
        return this.authenticated;
    }
}

export default new Auth();