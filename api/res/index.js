const db = require('../../config/db')
const fs =  require('fs');
const internal = require('stream');

class DB_REQUESTS{
    static store_data = [];

    static polls_req(){
        // select all polling unit
        let sql = "SELECT * FROM polling_unit LIMIT 300"
        db.query(sql,(err,res) => {
            if(err){console.log(err);}
            else{
                fs.writeFile('temp.txt', JSON.stringify(res), (err,res)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("temp_db updated")
                    }
                })
            }
        })
        
    }

    static totalNumberVoteLga(){
        // get all lga
        let sql = "SELECT lga_id, lga_name FROM lga"
        db.query(sql,(err,res) => {
            if(err) console.log(err)
            else{
                fs.writeFile('temp.txt', JSON.stringify(res), (err,res)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("temp_db updated")
                    }
                });
            }
        })
    }

    static totalNo(arg){
        // getting the polling unit id

        let sql = `SELECT polling_unit_id FROM polling_unit WHERE lga_id = ${arg}`
        db.query(sql,(err,res) => {
            if(err) console.log(err)
            else{
                try {
                    if (res != null || res != ''){
                        let ToJson = JSON.stringify(res)
                        console.log("Polling id: " + JSON.parse(ToJson.toString())[0].polling_unit_id)
                        let polling_id = parseInt(JSON.parse(ToJson.toString())[0].polling_unit_id);
                        let secondSql = `SELECT party_abbreviation,party_score FROM  announced_pu_results WHERE polling_unit_uniqueid = ${polling_id}`
                        db.query(secondSql,(err,res) => {
                            if(err){console.log(err)}
                            else{
                                fs.writeFile('temp.db', JSON.stringify(res), (err,res)=>{
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        console.log("total updated")
                                    }
                                });
                            }
                        })
                    }
                    else{
                        fs.writeFile('temp.db', '', (err,res)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("total updated")
                            }
                        });
                    }
                } catch (error) {
                    fs.writeFile('temp.db', '', (err,res)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log("total updated")
                        }
                    });
                }

            }
        })
        
    }
} 

module.exports = DB_REQUESTS
