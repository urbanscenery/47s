const express = require('express');
const async = require('async');
const router = express.Router();
const moment = require('moment');
const pool = require('../../config/db_pool');
const jwt = require('jsonwebtoken');


router.get('/', function(req, res) {
    return new Promise((fulfill, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);
                else fulfill(connection);
            });
        })
        .catch(err => {
            res.status(501).send({
                msg : "get Connection err : " + err
            });
            console.log(moment().format('MM/DDahh:mm:ss//') + "get Connection error : "+err);
        })
        .then(connection => {
            return new Promise((fulfill, reject) => {
                let token = req.headers.token;
                jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {
                    if (err) reject([err, connection]);
                    else {
                        var user_email = decoded.user_email;
                        fulfill([user_email, connection]);
                    }
                });
            });
        })
        .catch(([err, connection]) => {
            res.status(501).send({
                msg : "user authorization err" + err
            });
            console.log(moment().format('MM/DDahh:mm:ss//') + "user authorization error : "+err);
        })
        .then(([user_email, connection]) => {
            let query = 'select users_time from users where users_email = ?';
            connection.query(query, user_email, (err, data) => {
                if (err){
                    res.status(501).send({
                        msg : 'select query error : ' + err
                    });
                    console.log(moment().format('MM/DDahh:mm:ss//') + "select query error : "+err);
                }
                else {
                    res.status(200).send({
                        msg: 'Success',
                        data : {
                            all_time : data[0].users_time
                        }
                    });
                    console.log(moment().format('MM/DDahh:mm:ss//') + "Successful get all_time");
                }
                connection.release();
            });
        });
});

module.exports = router;
