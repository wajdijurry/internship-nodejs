'use strict';

module.exports = {
  db: {
      uri: process.env.MONGODB_URL || 'mongodb://173.20.128.1:27017/test',
      user: "root",
      pass: "root",
      dbName: "admin"
  },
};