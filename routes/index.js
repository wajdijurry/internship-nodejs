var express = require('express');
var router = express.Router();

var notificationsController = require('../controllers/notificationsController');
var postsController = require('../controllers/postsController');

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

// Notifications routes
router.get('/notifications', notificationsController.notifications_list);
router.get('/notifications/save', notificationsController.save_notification);

// Posts routes
router.get('/posts', postsController.posts_list);

module.exports = router;

