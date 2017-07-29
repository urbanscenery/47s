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
            res.status(500).send({
                result: [],
                message: "get Connection err : " + err
            });
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
            res.status(500).send({
                result: [],
                message: "user authorization err" + err
            });
        })
        .then(([user_email, connection]) => {
            let query = 'select users_time from users where users_email = ?';
            connection.query(query, user_email, (err, data) => {
                if (err) res.status(500).send({
                    result: [],
                    message: 'select query error : ' + err
                });
                else {
                    res.status(200).send({
                        all_time: data[0].users_time,
                        message: 'success'
                    });
                }
                connection.release();
            });
        });
});

module.exports = router;
