const dataAccess = require('../db/index');

const usersController = {
    init(app){
        app.get('/user', function(req, res){
            res.render('users/userHome', {
                title: `${req.user.username} Home page`,
            });
        });
        // Seller
        // Get all products
        app.get('/user/seller/products/view/all', function(req, res){
            dataAccess.products.getProductsByUserId(req.user.user_id).then(
                function(products){
                    res.render('users/seller/getAllItems', {
                        title: 'Looking at all of your products',
                        products: JSON.stringify(products),
                    });
                }
            );
        });
        // Adding a product
        app.get('/user/seller/products/add', function(req, res){
            res.render('users/seller/addItem', {
                title: 'Add a item',
            });
        });
        app.post('/user/seller/products/add', function(req, res){
            dataAccess.products.addProduct(req.user.user_id, req.body.name, req.body.price, req.body.quantity).then(
                function(prod_id){
                    res.redirect(`/user/seller/products/view/${prod_id}`);
                }
            );
        });
        // Get a product 
        app.get('/user/seller/products/view/:id', function(req, res){
            dataAccess.products.getProductById(req.params.id).then(
                function(product){
                    res.render('users/seller/getItem', {
                        title: 'View a product',
                        product: product,
                    });
                }
            );
        });
        // Edit a product
        app.get('/user/seller/products/edit/:id', function(req, res){
            dataAccess.products.getProductById(req.params.id).then(
                function(product){
                    res.render('users/seller/editItem', {
                        title: 'Editing a product',
                        product: product
                    });
                }
            );
        });
        app.post('/user/seller/products/edit/:id', function(req, res){
            dataAccess.products.editProductById(req.params.id, req.body.name, req.body.price, req.body.quantity).then(
                function(prod_id){
                    res.redirect(`/user/seller/products/view/${prod_id}`);
                }
            );
        });
        // Delete a product
        app.post('/user/seller/products/delete/:id', function(req, res){
            dataAccess.products.deleteProductById(req.params.id).then(
                function(){
                    res.redirect('/user/seller/products/view/all');
                }
            );
        });
        // Buyer
        // BUyer see all other products
        app.get('/user/buyer/products/view/all', function(req, res){
            dataAccess.products.getAllProductsForBuyer(req.user.user_id).then(
                function(products){
                    // res.send(products);
                    res.render('users/buyer/getAllItems', {
                        'title': 'View all products',
                        'products': JSON.stringify(products),
                    });
                }
            );
        });
        // Buyer viewing products
        app.get('/user/buyer/products/view/:id', function(req, res){
            dataAccess.products.getProductById(req.params.id).then(
                function(product){
                    res.render('users/buyer/viewItem', {
                        'title': 'Viewing a product to buy',
                        'product': product,
                    });
                }
            );
        });
        // Buyer buying a product
        app.get('/user/buyer/products/buy/:id', function(req, res){
            dataAccess.products.getProductById(req.params.id).then(
                function(product){
                    res.render('users/buyer/buyItem', {
                        'title': 'Buying a product',
                        'product':product,
                    });
                }
            );
        });
        app.post('/user/buyer/products/buy/:id', function(req, res){
            dataAccess.cart.addToCart(req.user.user_id, req.params.id, req.body.quantity).then(
                function(){
                    res.redirect('/user/buyer/cart');
                }
            );
        });
        // Look at buyers cart
        app.get('/user/buyer/cart', function(req, res){
            dataAccess.cart.getBuyerCartItems(req.user.user_id).then(
                function(cart_items){
                    res.render('users/buyer/viewCart', {
                        'title': "Looking at your cart",
                        'buyer_cart': JSON.stringify(cart_items),
                    });
                }
            );
        });
        // Deleting items from cart
        app.post('/user/buyer/remove', function(req, res){
            dataAccess.cart.removeSingleItemFromCart(req.user.user_id, req.body.prod_id).then(
                function(){
                    res.redirect('/user/buyer/cart');
                }
            );
        });
        // Checkout
        app.get('/user/buyer/checkout', function(req, res){
            dataAccess.cart.getBuyerCartItems(req.user.user_id).then(
                function(cart_items){
                    res.render('users/buyer/checkout', {
                        'title': 'Checkout',
                        'buyer_cart': JSON.stringify(cart_items),
                    });
                }
            );
        });
    },
};

module.exports = usersController;