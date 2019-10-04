let conn = require('./db');
var Pagination = require("./../inc/Pagination");

let path = require('path');

module.exports = {
    getDoctor(){

        return new Promise((resolve, reject) => {

            conn.query (
                "SELECT * FROM tb_doctor ORDER BY name" , (err, results) => {

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
                    fields.crm,
                    fields.email,                    
                    fields.endereco,
                    fields.especialidade,
                    fields.telefone,
                    fields.retorno,
                    fields.cidade,
                    fields.estado,
                    fields.obs
                   ];

                

               if (parseInt(fields.id) > 0) {

                params.push(fields.id);


                query = `
                    UPDATE tb_doctor
                    SET name = ?,
                        crm = ?,
                        email = ?
                        endereco?
                        especialidade = ?
                        telefone = ?
                        retorno = ?
                        cidade = ?
                        estado = ?
                        obs = ?                       
                    WHERE id = ?
                `;
               
            } else {

                query =  `
                
                INSERT INTO tb_doctor
                 (name, crm, email, endereco, especialidade, telefone, retorno, cidade, estado, obs) 
                 VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                            DELETE FROM tb_doctor WHERE id = ?
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
