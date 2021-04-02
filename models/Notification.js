'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Notification Schema
 */

const NotificationSchema = new Schema({
  userId: { type: String, default: '' },
  postId: {type: String, default: ''}
}, { timestamps: true });

/**
 * Validations
 */

NotificationSchema.path('userId').validate(function(userId) {
  return userId.length;
}, 'User Id cannot be blank');

NotificationSchema.path('postId').validate(function(postId) {
    return postId.length;
  }, 'Post Id cannot be blank');


/**
 * Methods
 */

NotificationSchema.methods = {

};

/**
 * Statics
 */

NotificationSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  all: function(options, cb) {
    options.select = options.select || '*';
    return this.find(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  getById: function (options, cb) {
      options.select = options.select || '*';
      return this.findOne(options.criteria)
        .select(options.select)
        .exec(cb);
  }
};

module.exports = mongoose.model('Notification', NotificationSchema, 'notifications');