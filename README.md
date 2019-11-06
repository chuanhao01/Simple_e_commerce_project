# Simple_e_commerce_project

This was a project I did as I learnt full-stack web development.  

This project was done with NodeJS running the backend and MySQL running the database.  
Technologies used:  
| Stack componoent|Technology|
|:---|:---|
|Front-End|HTML, CSS, JS Bootstrap-Vue, VueJS|
|Back-End|ExpressJS (running off NodeJS), express-handlebars (view engine),<br>mysql (JS lib to talk to MySQL database), passportJS (authentication)|
|Database|MySQL|

The idea of this project was to make a simple e-commerce website, like Amazon, Lazada or Taobao for example.  

## Setting up env and project  

### For ubuntu

Prerequisites:  
- NodeJS
- MySQL

Note: I recommend using MySQL workbench in conjuction with just MySQL from the terminal.

To start setting up the env, you can run these commands:
```bash
git clone https://github.com/chuanhao01/Simple_e_commerce_project.git
cd Simple_e_commerce_project
npm i
```

With this all the required node packages wil be installed.  
Then run the queries in `SQL for restful api.sql` file in sql.

Lastly note that you have to set up the mysql connection, `MysqlUser` and `MysqlPassword`, and the `CookiePassword`. (File name and code sinppet shown below).

`db/index.js`
```javascript
const db = require('mysql');
const pool = db.createConnection({
    connectionLimit: 10,
    user: process.env.MysqlUser, /*HERE*/
    password: process.env.MysqlPassword, /*HERE*/
    database: 'bed_e_commerce',
    port: 3306,
});
...
...
```

`app.js`
```javascript
...
...
app.use(session({
    secret: process.env.CookiePassword, /*HERE*/
    cookie: {
        httpOnly: true,
    },
    name: 'passport',
    resave: true,
    saveUninitialized: false,
}));
...
...
```

After this all you need to do to run the server is to type: `npm start` in the terminal.

## More details  

```bash
.
├── app.js
├── controllers
├── db
├── middlewares
├── package.json
├── package-lock.json
├── read_content
├── README.md
├── SQL for restful api.sql
└── views
```