const cartDB = {
    init(pool){
        this.pool = pool;
    },
    addToCart(buyer_id, prod_id, quantity){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            INSERT INTO cart
            (buyer_id, prod_id, quantity)
            VALUES
            (?, ?, ?)
            `, [buyer_id, prod_id, quantity], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
    getBuyerCartItems(buyer_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT p.prod_id, p.name, p.price, c.quantity, u.username AS seller_name
            FROM (
                (cart c INNER JOIN products p on c.prod_id = p.prod_id)
                INNER JOIN users u on p.seller_id = u.user_id
            )
            WHERE c.buyer_id = ?
            `, [buyer_id], function(err, data){
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
    removeSingleItemFromCart(buyer_id, prod_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            DELETE FROM cart
            WHERE (buyer_id = ? AND prod_id = ?)
            `, [buyer_id, prod_id], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
};

module.exports = cartDB;