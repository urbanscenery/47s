const express = require('express');
const async = require('async');
const router = express.Router();
const moment = require('moment');
const pool = require('../../config/db_pool');
const jwt = require('jsonwebtoken');


router.get('/:news_id', function(req, res){
    return new Promise((fulfill, reject) => {
        pool.getConnection((err, connection) => {
            if(err) reject(err);
            else fulfill(connection);
        });
    })
    .catch(err => {
        res.status(501).send({ msg: "get Connection err"});
        console.log(moment().format('MM/DDahh:mm:ss//') + "get connection err" + err);
    })
    .then(connection => {
        let query = 'select news_url from news where news_id = ?';
        connection.query(query, req.params.news_id, (err,data)=>{
            if(err){
                res.status(501).send({msg: "select query err"});
                console.log(moment().format('MM/DDahh:mm:ss//') + "select news_url query err" + err);
            }
            else{
                res.status(200).send({
                    msg : "Success",
                    data : {
                        news_url : data[0].news_url
                    }
                });
                console.log(moment().format('MM/DDahh:mm:ss//') + "Successful get news_url");
            }
            connection.release();
        });
    });
});

module.exports = router;
