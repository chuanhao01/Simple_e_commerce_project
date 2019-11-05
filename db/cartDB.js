const cartDB = {
    init(pool){
        this.pool = pool;
    },
    addToCart(buyer_id, prod_id, quantity){
        return new Promise((resolve, reject) => {
            // Selecting if the buyer has bought the item before
            this.pool.query(`
            SELECT * FROM cart
            WHERE buyer_id = ? AND prod_id = ?
            `, [buyer_id, prod_id], function(err, data){
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        }).then(
            function(cart_item){
                return new Promise((resolve, reject) => {
                    // If the cart item does not exists
                    if(cart_item.length < 1){
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
                    }
                    else{
                        this.pool.query(`
                        UPDATE cart c
                        SET quantity = quantity + ?
                        WHERE buyer_id = ? AND prod_id = ?
                        `, [quantity, buyer_id, prod_id], function(err){
                            if(err){
                                return reject(err);
                            }
                            return resolve(true);
                        });
                    }
                });
            }.bind(this)
        );
    },
    getBuyerCartItems(buyer_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT p.prod_id, p.name, p.price, c.quantity, u.username AS seller_username
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
    clearBuyerCart(buyer_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            DELETE FROM cart
            WHERE buyer_id = ?
            `, [buyer_id], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
};

module.exports = cartDB;