var rabbitmq = require('../modules/rabbitmq');

exports.posts_list = function (req, res) {
    rabbitmq.send_sync('laravel_queue', {
        route: "/api/post",
        method: "GET",
        headers: null,
        query: null,
        body: null
    }, function (posts_list) {
        res.render('posts_list', {
            posts_list: posts_list
        });
    });
}

exports.like_post = function (req, res) {
    // TODO: send like to PHP service
}