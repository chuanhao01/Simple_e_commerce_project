const whitelisted_paths = [
    '/',
    '/account/login',
    '/account/create'
];

function authPath(req, res, next){
    if(whitelisted_paths.includes(req._parsedOriginalUrl.pathname)){
        next();
    }
    else{
        if(req.user === undefined){
            res.status(403);
            res.render('error/403', {
                'title': '403 Error'
            });
        }
        else{
            next();
        }
    }
}

module.exports = authPath;