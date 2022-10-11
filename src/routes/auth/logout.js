import * as api from 'apis.js'

export function post(req, res) {
    api.del('sessions', req.session.token). then(response => {
        delete req.session.token;
        res.end(JSON.stringify(response));
    })
}