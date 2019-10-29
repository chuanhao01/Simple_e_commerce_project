const dataAccess = require('../db/index');

const apiController = {
    init(app){
        app.get('/api/products', function(req, res){
            dataAccess.products.getAllProducts().then(
                function(products){
                    res.send(products);
                }
            );
        });
    },
};

module.exports = apiController;