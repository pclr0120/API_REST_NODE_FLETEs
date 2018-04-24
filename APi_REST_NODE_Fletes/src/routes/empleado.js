const empleadoModel = require('../models/empleados');

module.exports = app => {




    app.get('/empleados/:id', (req, res) => {
        var id = req.params.id;
        empleadoModel.getEmpleado(id,(err, data) => {
            res.status(200).json(data);
            
      
          });
      });
  app.get('/empleados', (req, res) => {
    empleadoModel.getEmpleados((err, data) => {
      res.status(200).json(data);
 
    });
  });

  app.get('/empleadoso', (req, res) => {
    empleadoModel.getO((err, data) => {
      res.status(200).json(data);
 
    });
  });


  app.post('/empleados', (req, res) => {
    var empleadoData = {
      Id: null,
      Nombre: req.body.Nombre,
      Email: req.body.Email,
      RFC: req.body.RFC,
      CURP:req.body.Curp,
      Domicilio:req.body.Direccion,
      Licencia:req.body.Licencia,
      FechaNacimiento:req.body.FechaNacimiento,
      Telefono:req.body.Telefono,
      Puesto:req.body.Puesto,
      Foto:req.body.Foto
   
    };


    empleadoModel.insertEmpleado(empleadoData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new empleado",
          data: data
        });
        // res.redirect('/empleados/' + data.insertId);
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



  app.put('/empleados/:id', (req, res) => {
    const empleadoData = {
      id: req.params.id,
      Nombre:req.body.Nombre,
      Email:req.body.Email,
      RFC:req.body.RFC,
      CURP:req.body.Curp,
      Domicilio:req.body.Direccion,
      FechaNacimiento:req.body.FechaNacimiento,
      Licencia:req.body.Licencia,
      Telefono:req.body.Telefono,
      Puesto:req.body.Puesto,

    
   
    };
    empleadoModel.updateEmpleado(empleadoData, function (err, data) {
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

  app.delete('/empleados/:id', (req, res) => {
    var id = req.params.id;
    empleadoModel.deleteEmpleado(id, (err, data) =>  {
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
