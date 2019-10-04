let conn = require('./db');
var Pagination = require("./../inc/Pagination");
let path = require('path');

module.exports = {
    getExames(){

        return new Promise((resolve, reject) => {

            conn.query (
                "SELECT * FROM tb_exames ORDER BY name" , (err, results) => {

                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });

        },
        
        save(fields, files){



            return new Promise((resolve, reject)=>{


                let query, params = [
                    fields.name,
                    fields.local,
                    fields.obs
                   ];

                

               if (parseInt(fields.id) > 0) {

                params.push(fields.id);


                query = `
                    UPDATE tb_doctor
                    SET name = ?,
                        local = ?,
                        obs = ?                       
                    WHERE id = ?
                `;
               
            } else {

                query =  `
                
                INSERT INTO tb_doctor
                 (name, local, obs) 
                 VALUES(?, ?, ?)
                `;
    
    
               }
                   

                conn.query(query, params, (err, results)=>{

                    if (err) {
                        reject(err);

                    }else {
                        resolve(results);
                    }

                });
            });
        },
            delete(id){

                return new Promise((resolve, reject)=>{

                    conn.query(`
                            DELETE FROM tb_exames WHERE id = ?
                        `, [

                            id
                        ], (err, results)=> {

                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                });

            }

    };
