const express = require('express');
const async = require('async');
const router = express.Router();
const moment = require('moment');
const pool = require('../../config/db_pool');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
    let task_array = [
        //1. connection 설정
        function(callback) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    res.status(501).send({
                        msg: "Connection error"
                    });
                    callback("getConnecntion error at login: " + err, null);
                } else callback(null, connection);
            });
        },
        //2. header의 token 값으로 user_email 받아옴.
        function(connection, callback) {
            let token = req.headers.token;
            jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {
                if (err) {
                    res.status(501).send({
                        msg: "user authorization error"
                    });
                    connection.release();
                    callback("JWT decoded err : " + err, null);
                } else callback(null, decoded.user_email, connection);
            });
        },
        function(userEmail, connection, callback) {
            let userDataQuery = 'select users_category, users_playtime from users where users_email = ?';
            connection.query(userDataQuery, userEmail, function(err, userData) {
                if (err) {
                    res.status(501).send({
                        msg: "get user data error"
                    });
                    connection.release();
                    callback("userDataQuery error : " + err, null);
                } else {
                    let categoryString = userData[0].users_category;
                    let category = JSON.parse(categoryString);
                    let playlist = [];
                    let count = 0;
                    for (let i = 0; i < 4; i++) {
                        if (category.category[i] == 1) {
                            playlist.push(i + 1);
                            count++;
                        }
                    }
                    callback(null, userData[0].users_playtime , count, playlist, userEmail, connection);
                }
            });
        },
        function(playtime, count, playlist, userEmail, connection, callback){
            if(count == 0){
                res.status(200).send({
                    msg : "Success",
                    data : {
                        news : "관심뉴스가 없어 읽어드릴 수 없습니다. \n 47 second 어플리케이션에서 카테고리를 선택해주세요. "
                    }
                });
                connection.release();
                callback("Successful read news" + "no category");
            }
            else{
                let categoryVoice = "";
                let index = playtime % count;
                let category = playlist[index];
                if(category == 1) categoryVoice = "정치";
                else if(category == 2) categoryVoice = "경제";
                else if(category == 3) categoryVoice = "사회";
                else if(category == 4) categoryVoice = "IT 과학";
                let selectNewsQuery = 'select news_title from news where news_category = ? and news_date = ?';
                connection.query(selectNewsQuery, [category, moment().format('YYYYMMDD')], function(err, newsData){
                    let Voice = moment().format('YYYY/MM/DD') + ". 오늘의 "+categoryVoice+" 분야 뉴스입니다. \n 첫번째 뉴스. \n";
                    let i = 0;
                    for(; i < newsData.length-2 ; i++){
                        Voice += newsData[i].news_title + '\n 다음입니다. \n';
                    }
                    Voice += newsData[i].news_title + '\n 마지막 뉴스 입니다. \n' + newsData[i+1].news_title;
                    callback(null, Voice, playtime, userEmail, connection);
                });
            }
        },
        function(voice, playtime, userEmail, connection, callback){
            res.status(200).send({
                msg : "Success",
                data : {
                    news : voice
                }
            });
            let updatePlayTimeQuery = 'update users set users_playtime = ? where users_email = ?';
            connection.query(updatePlayTimeQuery, [playtime+1, userEmail], function(err){
                if(err){
                    connection.release();
                    callback("updatePlayTimeQuery error : "+ err, null);
                }
                else{
                    connection.release();
                    callback(null, "Successful playback Audio!");
                }
            });
        }

    ];
    async.waterfall(task_array, function(err, result) {
        if (err) {
            err = moment().format('MM/DDahh:mm:ss//') + err;
            console.log(err);
        } else {
            result = moment().format('MM/DDahh:mm:ss//') + result;
            console.log(result);
        }
    });
});



module.exports = router;
