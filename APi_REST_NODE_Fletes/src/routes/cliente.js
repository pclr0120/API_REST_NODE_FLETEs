const UserModel = require('../models/clientes');

module.exports = app => {

  app.get('/clientes/:id', (req, res) => {
    var id = req.params.id;
    UserModel.getcliente(id,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });
  app.get('/clientesN/:id', (req, res) => {
    var id = req.params.id;
    UserModel.getclienteN(id,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });


  app.get('/clientes', (req, res) => {
    UserModel.getUsers((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/clientes', (req, res) => {
    var userData = {
      Id: null,
      Nombre: req.body.Nombre,
      Empresa: req.body.Empresa,
      Estatus:req.body.Estatus,
      Direccion:req.body.Direccion,
      Email:req.body.Usuario,
      RFC:req.body.RFC,
      Telefono: req.body.Telefono,
      Pass:req.body.Pass,
      

   
    };
   
    UserModel.insertUser(userData, (err, data) => {
    try {
      if (data && data.insertId) {
// ///insertar primiso
//         var userData2 = {
//               Id:data.insertId,
//               Administrador: req.body.Administrador,
//               Cliente: req.body.Cliente,
//               Asistente: req.body.Asistente,
          
//               Chofer:req.body.Chofer
           
//             };
//         UserModel.insertUserPermisos(userData2, (err2, data2) => {

//         });
//         ///fin inserpermiso
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/cliente/' + data.insertId);
      } else {
        res.status(500).json({
          success: false,
          msg: "Error"
        });
      }
    } catch (error) {
      
    }
     
    });
  });

  app.put('/clientes/:id', (req, res) => {
    const userData = {
      Id: req.params.id,
      Nombre: req.body.Nombre,
      Empresa: req.body.Empresa,
      Estatus:req.body.Estatus,
      Direccion:req.body.Direccion,
      //Email:req.body.Usuario,
      //RFC:req.body.RFC,
      Telefono: req.body.Telefono,
      Pass:req.body.Pass,
      
   
    };
    UserModel.updateUser(userData, function (err, data) {
      if (data && data.msg) {
        res.status(200).json({data});
      } else {
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.delete('/clientes/:id', (req, res) => {
    var id = req.params.id;
    UserModel.deleteUser(id, (err, data) =>  {
      if (data && data.msg === 'deleted' || data.msg == 'not Exists') {
        res.json({
          success: 'true',
          data
        });
      } else {
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });
};
