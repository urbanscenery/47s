//52.78.124.103:3412/login
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
        var today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents from news where news_category = 1 and news_date = ? order by news_rank asc';
        connection.query(selectNewsQuery, today, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select politics current news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                res.status(200).send({
                    msg : "Success",
                    data : newsData
                });
                connection.release();
                callback("Successful find news data");
            }
        });
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
        var today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents from news where news_category = 2 and news_date = ? order by news_rank asc';
        connection.query(selectNewsQuery, today, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select economies current news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                res.status(200).send({
                    msg : "Success",
                    data : newsData
                });
                connection.release();
                callback("Successful find news data");
            }
        });
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
        var today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents from news where news_category = 3 and news_date = ? order by news_rank asc';
        connection.query(selectNewsQuery, today, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select societies current news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                res.status(200).send({
                    msg : "Success",
                    data : newsData
                });
                connection.release();
                callback("Successful find news data");
            }
        });
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
        var today = new Date();
        today = moment(today).format('YYYYMMDD');
        let selectNewsQuery = 'select news_id, news_title, news_image, news_date, news_contents from news where news_category = 4 and news_date = ? order by news_rank asc';
        connection.query(selectNewsQuery, today, function(err, newsData){
            if(err){
              res.status(501).send({
                msg : "select sciences current news error"
              });
              connection.release();
              callback("selectNewsQueryerr : " + err, null);
            }
            else{
                res.status(200).send({
                    msg : "Success",
                    data : newsData
                });
                connection.release();
                callback("Successful find news data");
            }
        });
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
