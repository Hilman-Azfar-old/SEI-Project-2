import sha256 from 'js-sha256'

class Auth {
    constructor() {
        this.authenticated = false
        this.currentUser = null
    }

    async login(obj, cb) {
        // call db and validate
        // using ajax
        // if validated get session cookie
        const url = `/api/login/${obj.username}/${sha256(obj.password)}`
        try {
            let response = await fetch(url)
            if (response.status == '200') {
                this.authenticated = true;
                this.currentUser = obj.username;
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
        const url = `/api/new/user`

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
                this.authenticated = true;
                this.currentUser = obj.username
                cb(true)
            } else {
                cb(false)
            }
        } catch (err) {
            console.log(err);
            cb(false)
        }
    }

    logout() {
        this.authenticated = false;
        this.currentUser = null
    }

    isAuthenticated() {
        // valid cookie and authenticated
        return this.authenticated;
    }
}

        // if (this.currentUser === user && this.authenticated) {
        //     return true
        // } else {
        //     return false
        // }
export default new Auth();