var express = require('express');
var router = express.Router();

var notifications_controller = require('../controllers/notificationsController');

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/notifications', notifications_controller.notifications_list);

router.get('/notifications/save', notifications_controller.save_notification);

module.exports = router;

