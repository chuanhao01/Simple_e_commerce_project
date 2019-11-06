CREATE DATABASE `bed_e_commerce`;

USE bed_e_commerce;

CREATE TABLE if not exists users(
	user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE if not exists products(
	prod_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    quantity INT(255) NOT NULL,
    seller_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(seller_id)
    REFERENCES users(user_id),
    PRIMARY KEY(prod_id)
);

CREATE TABLE IF NOT EXISTS cart(
	buyer_id VARCHAR(255) NOT NULL,
    prod_id VARCHAR(255) NOT NULL,
    quantity INT(255) NOT NULL,
    PRIMARY KEY(buyer_id, prod_id)
);

CREATE TABLE IF NOT EXISTS transactions_history(
	transaction_id VARCHAR(255) NOT NULL,
    buyer_id VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    PRIMARY KEY (transaction_id)
);

CREATE TABLE IF NOT EXISTS transactions_items(
	transaction_id VARCHAR(255) NOT NULL,
    prod_id VARCHAR(255) NOT NULL,
    quantity INT(255) NOT NULL,
    FOREIGN KEY (transaction_id)
    REFERENCES transactions_history(transaction_id),
    PRIMARY KEY(transaction_id, prod_id)
);
