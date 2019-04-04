const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        console.log(req.query)
        const { username, password, profile_pic } = req.body;
        const { session } = req;
        
        const db = req.app.get('db');
        let taken = await db.auth.check_username({ username });
        taken = +taken[0].count;
        if(taken !== 0) {
            return res.sendStatus(409)
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let user = await db.auth.register({ username, password: hash, profile_pic });
        user = user[0]
        // console.log({before: session})
        session.user = user;
        res.status(200).send(session.user)
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        let user = await db.auth.login({ username });
        user = user[0];
        if(!user){
            return res.sendStatus(404)
        }
        let authenticated = bcrypt.compareSync(password, user.password);
        if(authenticated){
            delete user.password;
            session.user = user;
            res.status(200).send(session.user);
        } else {
            res.sendStatus(401);
        }

    },
    getUser: (req, res) => {
        const {user} = req.session;
        if(user){
            res.status(200).send(user);
        } else {
            res.sendStatus(401);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}