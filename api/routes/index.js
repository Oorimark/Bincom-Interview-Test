const express = require('express');
const DB_REQUESTS = require('../res')
const db = require('../../config/db')
const fs = require('fs');
const parseJson = require('parse-json');
const bodyParser = require('body-parser')
const { urlencoded } = require("body-parser"); 

const router = express.Router();

// fs.readFile('temp.txt',(err,data)=>{
//     if(err) throw err;
//     else{
//         let buff = Buffer.from(data)
//         console.log(buff.toString('utf-8'))
//         console.log(JSON.parse(buff.toString('utf-8')))
//         for (let i of data){
//             //console.log(buffer.toString("utf-8",i))
//         } 
//     }
// });

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json())

router.get("/",(req,res) => {
    res.render('index');
    let requestPollingResult = DB_REQUESTS.polls_req();
     
})

router.get("/getResult",(req,res)=> {
    DB_REQUESTS.polls_req()
    setTimeout(()=>{
        fs.readFile('temp.txt',(err,data)=>{
            if(err) throw err;
            else{
                let buff = Buffer.from(data)
                return res.render("res",{data: {res : JSON.parse(buff.toString('utf-8'))}})
            }
        });
    }, 3000) // delay 3s to write successfully
}) 

router.get("/total",(req,res)=>{
    // call dbRequst
    DB_REQUESTS.totalNumberVoteLga()
    setTimeout(()=>{
        fs.readFile('temp.txt',(err,data)=>{
            if(err) throw err;
            else{
                let buff = Buffer.from(data)
                return res.render("sumTotal",{data: {res : JSON.parse(buff.toString('utf-8'))}})
            }
        });
    }, 3000)

    // passing the party score

});

router.get("/dispScore",(req,res) => {
        fs.readFile('temp.db',(err,score) => {
            if(err) console.log(err)
            else{
                try {
                    let buff = Buffer.from(score)
                return res.render("dispScore",{data: {res : JSON.parse(score.toString('utf-8'))}})
                } catch (error) {
                return res.render("dispScore",{data: {res : ''}})
                }
            }
        })
})

router.post("/total",(req,res) => {
    let request = req.body.lga;
    DB_REQUESTS.totalNo(request)
    return res.redirect("/dispScore")
})

module.exports = router   