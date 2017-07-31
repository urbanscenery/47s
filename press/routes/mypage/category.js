//52.78.124.103:3412/login
const express = require('express');
const async = require('async');
const router = express.Router();
const moment = require('moment');
const pool = require('../../config/db_pool');
const jwt = require('jsonwebtoken');


//멤버쉽 정보 조회
router.put('/', function(req, res){
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
    //2. header의 token 값으로 user_email 받아옴.
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
        let array = [Number(req.body.category1), Number(req.body.category2), Number(req.body.category3), Number(req.body.category4)];
        console.log(array);
        console.log(req.body);
      let categorySetJSON = {
          category : array
      };
      let categorySet = JSON.stringify(categorySetJSON);
      let updateCategoryQuery = 'update users set users_category = ? where users_email = ?';
      connection.query(updateCategoryQuery, [categorySet, userEmail], function(err){
          if(err){
            res.status(501).send({
              msg : "update category set error"
            });
            connection.release();
            callback("updateCategoryQuery err : " + err, null);
          }
          else{
            res.status(200).send({
              msg : "Success"
            });
            connection.release();
            callback(null, "Successful change category");
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
