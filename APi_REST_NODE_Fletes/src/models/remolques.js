const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'fletes'
});

let DataModel = {};

DataModel.gets = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM  catalagocaja ORDER BY Id',
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
         
          callback(null, rows);
        }
      }
    )
  }
};




DataModel.insert = (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO  catalagocaja SET ?', userData,
        (err, result) => {
          if (err) {
            throw err;
          } else {
            callback(null, {'insertId': result.insertId})
          }
        }
      )
    }
  
  } catch (error) {
    
  }
};

DataModel.update = (userData, callback) => {
  console.log('cale:',userData)
  if (connection) {
    const sql = `
      UPDATE  catalagocaja SET

      Marca = ${connection.escape(userData.Marca)},
 
      tipo= ${connection.escape(userData.tipo)},
     
      CapacidadCarga  = ${connection.escape(userData.CapacidadCarga)},
      NumeroChasis  = ${connection.escape(userData.NumeroChasis)},
  
      Modelo  = ${connection.escape(userData.Modelo)},
      Estatus  = ${connection.escape(userData.Estatus)},

      Anio  = ${connection.escape(userData.Anio)}
   
      
      WHERE Id = ${userData.Id}`;

    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "success"
        })
      }
    });
  }
};

DataModel.delete = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM  catalagocaja WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM  catalagocaja WHERE Id=` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else{
            callback(null, {
              "msg": "deleted"
            });
          }
        });
      } else {
        callback(null, {
          "msg": "not Exists"
        });
      }
    });
  }
}
DataModel.get = (id,callback) => {
  if (connection) {
    connection.query('SELECT *from  catalagocaja WHERE Id='+ connection.escape(id),
      (err, rows) => {
        if (err) {
          throw err
        }
        else {
         
          callback(null, rows);
        }
      }
    )
  }
};


module.exports = DataModel;
