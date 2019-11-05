const uuid = require('uuid/v4');
const moment = require('moment');

const transactionsDB = {
    init(pool){
        this.pool = pool;
    },
    checkoutCartByUser(buyer_id, cart){
        // Creating new transaction
        return new Promise((resolve, reject) => {
            let transaction_id = uuid(),
            timestamp = moment();
            this.pool.query(`
            INSERT INTO transactions_history
            (transaction_id, buyer_id, timestamp)
            VALUES
            (?, ?, ?)
            `, [transaction_id, buyer_id, timestamp.format()], function(err){
                if(err){
                    return reject(err);
                }
                return resolve(transaction_id);
            });
        }).then(
            // Creating the transaction items
            function(transaction_id){
                return new Promise((resolve, reject) => {
                    // Create array to insert
                    let transaction_items = [];
                    for(let item of cart){
                        let transaction_item = [];
                        transaction_item.push(transaction_id);
                        transaction_item.push(item.prod_id);
                        transaction_item.push(item.quantity);
                        transaction_items.push(transaction_item);
                    }
                    this.pool.query(`
                    INSERT INTO transactions_items
                    (transaction_id, prod_id, quantity)
                    VALUES
                    ?`, [transaction_items], function(err){
                        if(err){
                            return reject(err);
                        }
                        return resolve(true);
                    });
                });
            }.bind(this)
        ).then(
            function(){
                return new Promise((resolve, reject) => {
                    this.pool.query(`
                    UPDATE products p INNER JOIN cart c ON c.prod_id = p.prod_id
                    SET p.quantity = p.quantity - c.quantity
                    WHERE p.prod_id = c.prod_id
                    `, function(err){
                        if(err){
                            return reject(err);
                        }
                        return resolve(true);
                    });
                });
            }.bind(this)
        );
    },
    getUserTransactionHistory(buyer_id){
        return new Promise((resolve, reject) => {
            this.pool.query(`
            SELECT th.transaction_id, th.timestamp, ti.prod_id, ti.quantity, p.price, p.name, u.username AS seller_username
            FROM (
                ((transactions_history th INNER JOIN transactions_items ti ON th.transaction_id = ti.transaction_id) 
                INNER JOIN products p ON ti.prod_id = p.prod_id)
                INNER JOIN users u ON p.seller_id = u.user_id
            )
            WHERE th.buyer_id = ?
            `, [buyer_id], function(err, data){
                if(err){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    },
};

module.exports = transactionsDB;