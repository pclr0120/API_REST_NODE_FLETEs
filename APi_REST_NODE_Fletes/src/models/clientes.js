const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'fletes'
});

let userModel = {};

userModel.getUsers = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM cliente ORDER BY Id',
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

userModel.insertUserPermisos = (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO PermisosUser SET ?', userData,
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


userModel.insertUser = (  userData, callback) => {
  try {
    if (connection) {
      connection.query('INSERT INTO cliente SET ?', userData,
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


userModel.updateUser = (userData, callback) => {
  console.log('jajaj',userData)
  if (connection) {
    const sql = `
      UPDATE cliente SET
      Nombre = ${connection.escape(userData.Nombre)},
      
      Direccion = ${connection.escape(userData.Direccion)},
      
      Empresa = ${connection.escape(userData.Empresa)},
      
      Pass = ${connection.escape(userData.Pass)},
      Estatus= ${connection.escape(userData.Estatus)},
      Telefono= ${connection.escape(userData.Telefono)}
     
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

userModel.deleteUser = (id, callback) => {
  if (connection) {
    var sqlExists = `
      SELECT * FROM cliente WHERE Id = ${connection.escape(id)}
    `;
    connection.query(sqlExists, (err, row) => {
      if (row) {
        var sql = `DELETE FROM cliente WHERE Id=` + connection.escape(id);
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
userModel.getcliente = (id,callback) => {
  if (connection) {
    connection.query('SELECT *from cliente WHERE Id='+ connection.escape(id),
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
userModel.getclienteN = (id,callback) => {
  if (connection) {
    connection.query('SELECT *from cliente WHERE Nombre='+ connection.escape(id),
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
userModel.getLog = (user,callback) => {
  if (connection) {
    connection.query('SELECT *from cliente WHERE userrr='+ connection.escape(user),
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
module.exports = userModel;
