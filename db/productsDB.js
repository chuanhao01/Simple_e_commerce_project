const uuid = require('uuid/v4');

const productsDB = {
    init(pool){
        this.pool = pool;
    },
    getAllProducts(){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT * FROM products
            `, function(err, data){
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
    addProduct(seller_id, name, price, quantity){
        return new Promise((resolve, reject) => {
            const prod_id = uuid();
            this.pool.query(`
            INSERT INTO products
            (prod_id, name, price, quantity, seller_id)
            VALUES
            (?, ?, ?, ?, ?)
            `, [prod_id, name, price, quantity, seller_id], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(prod_id);
            });
        });
    },
    getProductById(prod_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT p.prod_id, p.name, p.price, u.username AS seller_username FROM products p
            INNER JOIN users u
            ON p.seller_id = u.user_id 
            WHERE p.prod_id = ?
            `, [prod_id], function(err, data){
                if(err || data.length < 1){
                    return reject(err);
                }
                return resolve(data[0]);
            });
        });
    },
    editProductById(prod_id, name, price, quantity){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            UPDATE products
            SET name = ?, price = ?, quantity = ?
            WHERE prod_id = ?
            `, [name, price, quantity, prod_id], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(prod_id);
            });
        });
    },
    getProductsByUserId(user_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT * FROM products
            WHERE seller_id = ?
            `, [user_id], function(err, data){
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
    deleteProductById(prod_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            DELETE FROM products WHERE prod_id = ?
            `, [prod_id], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
    getAllProductsForBuyer(buyer_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT p.prod_id, p.name, p.price, u.username AS seller_username FROM products p
            INNER JOIN users u
            ON p.seller_id = u.user_id 
            WHERE p.seller_id != ?
            `, [buyer_id], function(err, data){
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
};

module.exports = productsDB;