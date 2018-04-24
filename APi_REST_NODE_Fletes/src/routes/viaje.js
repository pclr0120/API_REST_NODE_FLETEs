const DataModel = require('../models/viajes');

module.exports = app => {

  app.get('/viajes/:id', (req, res) => {
    var id = req.params.id;
    DataModel.get(id,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });



  app.get('/viajes', (req, res) => {
    DataModel.gets((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/viajes', (req, res) => {
    var userData = {
      Id: null,
      Cliente: req.body.Cliente,
  
      AsignacionOperador: req.body.AsignacionOperador,
  
      Mercancia:req.body.Mercancia,
      Origen:req.body.Origen,
      Destino: req.body.Destino,
  
      FechaTraslado: req.body.FechaTraslado,
      FechaEntrega:req.body.FechaEntrega,
      Costo:req.body.Costo,
      EstadoViaje:req.body.EstadoViaje,
      AsignacionCaja:req.body.AsignacionCaja,
      AsignacionCamion:req.body.AsignacionCamion,
      Tipo:req.body.Tipo,
      Pago:req.body.Pago,
      PagoMin:req.body.PagoMin





      
      
      
      
      
   
    };
    DataModel.insert(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/viajes/' + data.insertId);
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

  app.put('/viajes/:id', (req, res) => {
    const userData = {
      Id: req.params.id,
    
      Cliente: req.body.Cliente,
  
      AsignacionOperador: req.body.AsignacionOperador,
  
      Mercancia:req.body.Mercancia,
      Origen:req.body.Origen,
      Destino: req.body.Destino,
  
      FechaTraslado: req.body.FechaTraslado,
      FechaEntrega:req.body.FechaEntrega,
      Costo:req.body.Costo,
      EstadoViaje:req.body.EstadoViaje,
      AsignacionCaja:req.body.AsignacionCaja,
      AsignacionCamion:req.body.AsignacionCamion,
      Tipo:req.body.Tipo,
      Pago:req.body.Pago,
      PagoMin:req.body.PagoMin
      


   
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

  app.delete('/viajes/:id', (req, res) => {
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
