var Notification = require('../models/Notification');
var errorsBag = {};

exports.notifications_list = function(req, res) {
    let criteria = {};

    if (req.query.user_id) {
        criteria.userId = req.query.user_id;
    }

    if (req.query.post_id) {
        criteria.postId = req.query.post_id;
    }

    Notification.find(criteria, function(err, notifications) {
        if (err) {
            errorsBag = Object.keys(err).map(
                field => err[field].message
            );
        }
    
        res.render('notifications_list', {
            notifications_list: notifications,
            errors: errorsBag
        });
      });
};

exports.save_notification = function(req, res) {
    const notification = new Notification({userId: "1234", postId: "5678"});
    notification.save().catch( ( { errors } ) => {
        errorsBag = Object.keys(errors).map(
            field => errors[field].message
        );
    });

    res.render('notifications_list', {
        title: 'Notifications list',
        errors: errorsBag,
        notifications_list: Notification.all({})
    });
};