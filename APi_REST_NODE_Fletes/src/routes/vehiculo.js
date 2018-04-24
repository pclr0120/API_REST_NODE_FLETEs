const DataModel = require('../models/vehiculos');

module.exports = app => {

  app.get('/vehiculo/:id', (req, res) => {
    var id = req.params.id;
    DataModel.get(id,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });



  app.get('/vehiculo', (req, res) => {
    DataModel.gets((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/vehiculo', (req, res) => {
    var userData = {
      Id: null,
      Marca: req.body.Marca,
      Placa: req.body.Placa,
      tipo: req.body.Tipo,
      Poliza: req.body.Poliza,
      Anio:req.body.Anio,
      CapacidadCarga:req.body.CapacidadCarga,
      NumeroChasis: req.body.NumeroChasis,
      Combustible: req.body.Combustible,
      KmRecorrido: req.body.KmRecorrido,
      Modelo: req.body.Modelo,
Estatus: req.body.Estatus,
FechaRR: req.body.FechaRegistro,
FechaV: req.body.FechaVencimiento,
NumProv: req.body.NumProv,
KmRecorridoM: req.body.KmRecorridoM



      
      
      
      
      
   
    };
    DataModel.insert(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/vehiculo/' + data.insertId);
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

  app.put('/vehiculo/:id', (req, res) => {
    const userData = {
      Id: req.params.id,
     
     
      Marca: req.body.Marca,
      Placa: req.body.Placa,
      tipo: req.body.Tipo,
      Poliza: req.body.Poliza,
      Anio:req.body.Anio,
      CapacidadCarga:req.body.CapacidadCarga,
      NumeroChasis: req.body.NumeroChasis,
      Combustible: req.body.Combustible,
      KmRecorrido: req.body.KmRecorrido,
      Modelo: req.body.Modelo,
Estatus: req.body.Estatus,
FechaRR: req.body.FechaRR,
FechaV: req.body.FechaV,
NumProv: req.body.NumProv,
KmRecorridoM: req.body.KmRecorridoM
   
    };
    DataModel.update(userData, function (err, data) {
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

  app.delete('/vehiculo/:id', (req, res) => {
    var id = req.params.id;
    DataModel.delete(id, (err, data) =>  {
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
