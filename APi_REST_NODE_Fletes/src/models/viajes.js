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
    connection.query('SELECT * FROM  viaje ORDER BY Id',
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
      connection.query('INSERT INTO  viaje SET ?', userData,
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
      UPDATE  viaje SET

      Cliente = ${connection.escape(userData.Cliente)},
 
      AsignacionOperador= ${connection.escape(userData.AsignacionOperador)},
     
      Mercancia  = ${connection.escape(userData.Mercancia)},
      Origen  = ${connection.escape(userData.Origen)},
  
      Destino  = ${connection.escape(userData.Destino)},
      FechaTraslado  = ${connection.escape(userData.FechaTraslado)},

      FechaEntrega  = ${connection.escape(userData.FechaEntrega)},
      Costo  = ${connection.escape(userData.Costo)},
      EstadoViaje  = ${connection.escape(userData.EstadoViaje)},
      AsignacionCaja  = ${connection.escape(userData.AsignacionCaja)},
      AsignacionCamion  = ${connection.escape(userData.AsignacionCamion)},
      Tipo  = ${connection.escape(userData.Tipo)},
      Pago  = ${connection.escape(userData.Pago)},
      PagoMin  = ${connection.escape(userData.PagoMin)}
   
      
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
      SELECT * FROM  viaje WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM  viaje WHERE Id=` + connection.escape(id);
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
    connection.query('SELECT *from  viaje WHERE Id='+ connection.escape(id),
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
