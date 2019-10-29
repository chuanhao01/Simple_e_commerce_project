const homeController = {
    init(app){
        app.get('/', function(req, res){
            res.render('home/landing', {
                'title':'Welcome to CH Store'
            });
        });
    },
};

module.exports = homeController;