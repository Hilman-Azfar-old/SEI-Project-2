import sha256 from 'js-sha256'

class Auth {
    constructor() {
        this.authenticated = true
    }

    async login(obj, cb) {
        // call db and validate
        // using ajax
        // if validated get session cookie
        const url = `http://192.168.1.106:3000/api/login/${obj.username}/${sha256(obj.password)}`
        try {
            let response = await fetch(url)
            if (response.status == '200') {
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

    async register(obj, cb) {
        const url = `http://192.168.1.106:3000/api/new/user`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: obj.username,
                password: sha256(obj.password),
            })
        };
        try {
            let response = await fetch(url, requestOptions)
            if (response.ok === true){
                cb(true)
            } else {
                cb(false)
            }
        } catch (err) {
            console.log(err);
            cb(false)
        }
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