const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'fletes'
});

let empleadoModel = {};

empleadoModel.getEmpleados = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM empleado ORDER BY Id',
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




empleadoModel.insertEmpleado = (  empladoData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO empleado SET ?', empladoData,
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

empleadoModel.updateEmpleado = (empladoData, callback) => {
  if (connection) {
    const sql = `
      UPDATE empleado SET
      Nombre = ${connection.escape(empladoData.Nombre)},
      Email = ${connection.escape(empladoData.Email)},
      RFC = ${connection.escape(empladoData.RFC)},
      CURP= ${connection.escape(empladoData.CURP)},
      Domicilio = ${connection.escape(empladoData.Domicilio)}
      ,FechaNacimiento = ${connection.escape(empladoData.FechaNacimiento)},
      Licencia = ${connection.escape(empladoData.Licencia)},
      Telefono = ${connection.escape(empladoData.Telefono)},

      Puesto = ${connection.escape(empladoData.Puesto)}
      WHERE Id = ${empladoData.id}`;

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

empleadoModel.deleteEmpleado = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM empleado WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM empleado WHERE Id=` + connection.escape(id);
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

empleadoModel.getEmpleado = (id,callback) => {
  if (connection) {
    connection.query('SELECT Nombre,Email,Curp,Domicilio,RFC,FechaNacimiento,Puesto,Licencia,Telefono,Foto FROM empleado WHERE Id='+ connection.escape(id),
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
empleadoModel.getO = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM empleado where Puesto="Asistente" and Estatus="A" ORDER BY Id',
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

module.exports = empleadoModel;
