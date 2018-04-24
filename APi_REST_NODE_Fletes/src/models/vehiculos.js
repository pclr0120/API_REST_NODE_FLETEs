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
    connection.query('SELECT * FROM vehiculo ORDER BY Id',
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
      connection.query('INSERT INTO vehiculo SET ?', userData,
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
  console.log('jajaj',userData)
  if (connection) {
    const sql = `
      UPDATE vehiculo SET

      Marca = ${connection.escape(userData.Marca)},
      Placa= ${connection.escape(userData.Placa)},
      tipo= ${connection.escape(userData.tipo)},
      Poliza  = ${connection.escape(userData.Poliza)},
      CapacidadCarga  = ${connection.escape(userData.CapacidadCarga)},
      NumeroChasis  = ${connection.escape(userData.NumeroChasis)},
      Combustible  = ${connection.escape(userData.Combustible)},
      KmRecorrido  = ${connection.escape(userData.KmRecorrido)},
      Modelo  = ${connection.escape(userData.Modelo)},
      Estatus  = ${connection.escape(userData.Estatus)},
      FechaRR  = ${connection.escape(userData.FechaRR)},
      FechaV  = ${connection.escape(userData.FechaV)},
      Anio  = ${connection.escape(userData.Anio)},
      NumProv  = ${connection.escape(userData.NumProv)},
      KmRecorridoM  = ${connection.escape(userData.KmRecorridoM)}
      
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
      SELECT * FROM vehiculo WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM vehiculo WHERE Id=` + connection.escape(id);
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
    connection.query('SELECT *from vehiculo WHERE Id='+ connection.escape(id),
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
