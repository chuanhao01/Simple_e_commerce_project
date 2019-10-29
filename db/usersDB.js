const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 13;

const usersdb = {
    init(pool){
        this.pool = pool;
    },
    createUser(username, password){
        return new Promise(async (resolve, reject) => {
            const user_id = uuid();
            const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
            this.pool.query(`
            INSERT INTO users
            (user_id, username, password)
            VALUES
            (?, ?, ?)
            `, [user_id, username, password_hash], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
    getUserbyUsername(username){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT * FROM users
            WHERE username = ?
            `, [username], function(err, data){
                if(err || data.length < 1){
                    return reject('User does not exisit');
                }
                return resolve(data[0]);
            });
        });
    },
    getUserById(user_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT * FROM users
            WHERE user_id = ?
            `, [user_id], function(err, data){
                if(err || data.length < 1){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
    checkPassword(password, password_hash){
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, password_hash, function(err, same){
                if(err){
                    return reject(err);
                }
                return resolve(same);
            });
        });
    },
};

module.exports = usersdb;