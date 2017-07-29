const express = require('express');
const async = require('async');
const router = express.Router();
const moment = require('moment');
const pool = require('../../config/db_pool');
const jwt = require('jsonwebtoken');


router.get('/politics', function(req, res){
    let task_array = [
      //1. connection 설정
      function(callback){
  			pool.getConnection(function(err, connection){
  				if(err){
            res.status(501).send({
              msg : "Connection error"
            });
            callback("getConnecntion error at login: " + err, null);
          }
  				else callback(null, connection);
  			});
  		},
      function(connection, callback){
        let token = req.headers.token;
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded){
          if(err){
            res.status(501).send({
              msg : "user authorization error"
            });
            connection.release();
            callback("JWT decoded err : "+ err, null);
          }
          else callback(null, decoded.user_email, connection);
        });
      },
      function(userEmail, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents '+
        'from news where news_category = 1 '+
        'order by news_rank asc';
        connection.query(selectNewsQuery, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select politics past news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                callback(null, newsData, connection);
            }
        });
    },
    function(newsData, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let oneago = moment(today).subtract(1, 'days').format('YYYYMMDD');
        let twoago = moment(today).subtract(2, 'days').format('YYYYMMDD');
        let oneday = [];
        let twoday = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].news_date == oneago) {
                oneday.push(data[i]);
            } else if (data[i].news_date == twoago) {
                twoday.push(data[i]);
            }
        }
        res.status(200).send({
            msg : "Success",
            data : {
                yesterdayX1 : oneday,
                yesterdayX2 : twoday
            }
        });
        connection.release();
        callback(null, "Successful find past news");
    }
    ];
    async.waterfall(task_array, function(err, result) {
      if (err){
        err = moment().format('MM/DDahh:mm:ss//') + err;
        console.log(err);
      }
      else{
        result = moment().format('MM/DDahh:mm:ss//') + result;
        console.log(result);
      }
    });
});


router.get('/economies', function(req, res){
    let task_array = [
      //1. connection 설정
      function(callback){
  			pool.getConnection(function(err, connection){
  				if(err){
            res.status(501).send({
              msg : "Connection error"
            });
            callback("getConnecntion error at login: " + err, null);
          }
  				else callback(null, connection);
  			});
  		},
      function(connection, callback){
        let token = req.headers.token;
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded){
          if(err){
            res.status(501).send({
              msg : "user authorization error"
            });
            connection.release();
            callback("JWT decoded err : "+ err, null);
          }
          else callback(null, decoded.user_email, connection);
        });
      },
      function(userEmail, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents '+
        'from news where news_category = 2 '+
        'order by news_rank asc';
        connection.query(selectNewsQuery, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select economies past news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                callback(null, newsData, connection);
            }
        });
    },
    function(newsData, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let oneago = moment(today).subtract(1, 'days').format('YYYYMMDD');
        let twoago = moment(today).subtract(2, 'days').format('YYYYMMDD');
        let oneday = [];
        let twoday = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].news_date == oneago) {
                oneday.push(data[i]);
            } else if (data[i].news_date == twoago) {
                twoday.push(data[i]);
            }
        }
        res.status(200).send({
            msg : "Success",
            data : {
                yesterdayX1 : oneday,
                yesterdayX2 : twoday
            }
        });
        connection.release();
        callback(null, "Successful find past news");
    }
    ];
    async.waterfall(task_array, function(err, result) {
      if (err){
        err = moment().format('MM/DDahh:mm:ss//') + err;
        console.log(err);
      }
      else{
        result = moment().format('MM/DDahh:mm:ss//') + result;
        console.log(result);
      }
    });
});

router.get('/societies', function(req, res){
    let task_array = [
      //1. connection 설정
      function(callback){
  			pool.getConnection(function(err, connection){
  				if(err){
            res.status(501).send({
              msg : "Connection error"
            });
            callback("getConnecntion error at login: " + err, null);
          }
  				else callback(null, connection);
  			});
  		},
      function(connection, callback){
        let token = req.headers.token;
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded){
          if(err){
            res.status(501).send({
              msg : "user authorization error"
            });
            connection.release();
            callback("JWT decoded err : "+ err, null);
          }
          else callback(null, decoded.user_email, connection);
        });
      },
      function(userEmail, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents '+
        'from news where news_category = 3 '+
        'order by news_rank asc';
        connection.query(selectNewsQuery, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select societies past news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                callback(null, newsData, connection);
            }
        });
    },
    function(newsData, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let oneago = moment(today).subtract(1, 'days').format('YYYYMMDD');
        let twoago = moment(today).subtract(2, 'days').format('YYYYMMDD');
        let oneday = [];
        let twoday = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].news_date == oneago) {
                oneday.push(data[i]);
            } else if (data[i].news_date == twoago) {
                twoday.push(data[i]);
            }
        }
        res.status(200).send({
            msg : "Success",
            data : {
                yesterdayX1 : oneday,
                yesterdayX2 : twoday
            }
        });
        connection.release();
        callback(null, "Successful find past news");
    }
    ];
    async.waterfall(task_array, function(err, result) {
      if (err){
        err = moment().format('MM/DDahh:mm:ss//') + err;
        console.log(err);
      }
      else{
        result = moment().format('MM/DDahh:mm:ss//') + result;
        console.log(result);
      }
    });
});

router.get('/sciences', function(req, res){
    let task_array = [
      //1. connection 설정
      function(callback){
  			pool.getConnection(function(err, connection){
  				if(err){
            res.status(501).send({
              msg : "Connection error"
            });
            callback("getConnecntion error at login: " + err, null);
          }
  				else callback(null, connection);
  			});
  		},
      function(connection, callback){
        let token = req.headers.token;
        jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded){
          if(err){
            res.status(501).send({
              msg : "user authorization error"
            });
            connection.release();
            callback("JWT decoded err : "+ err, null);
          }
          else callback(null, decoded.user_email, connection);
        });
      },
      function(userEmail, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents '+
        'from news where news_category = 1 '+
        'order by news_rank asc';
        connection.query(selectNewsQuery, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select sciences past news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                callback(null, newsData, connection);
            }
        });
    },
    function(newsData, connection, callback){
        let today = new Date();
        today = moment(today).format('YYYYMMDD');
        let oneago = moment(today).subtract(1, 'days').format('YYYYMMDD');
        let twoago = moment(today).subtract(2, 'days').format('YYYYMMDD');
        let oneday = [];
        let twoday = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].news_date == oneago) {
                oneday.push(data[i]);
            } else if (data[i].news_date == twoago) {
                twoday.push(data[i]);
            }
        }
        res.status(200).send({
            msg : "Success",
            data : {
                yesterdayX1 : oneday,
                yesterdayX2 : twoday
            }
        });
        connection.release();
        callback(null, "Successful find past news");
    }
    ];
    async.waterfall(task_array, function(err, result) {
      if (err){
        err = moment().format('MM/DDahh:mm:ss//') + err;
        console.log(err);
      }
      else{
        result = moment().format('MM/DDahh:mm:ss//') + result;
        console.log(result);
      }
    });
});




module.exports = router;
