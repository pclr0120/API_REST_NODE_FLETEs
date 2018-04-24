const DataModel = require('../models/remolques');

module.exports = app => {

  app.get('/remolques/:id', (req, res) => {
    var id = req.params.id;
    DataModel.get(id,(err, data) => {
        res.status(200).json(data);
        
  
      });
  });



  app.get('/remolques', (req, res) => {
    DataModel.gets((err, data) => {
      res.status(200).json(data);
    });
  });


  app.post('/remolques', (req, res) => {
    var userData = {
      Id: null,
      Marca: req.body.Marca,
  
      tipo: req.body.Tipo,
  
      Anio:req.body.Anio,
      CapacidadCarga:req.body.CapacidadCarga,
      NumeroChasis: req.body.NumeroChasis,
  
      Modelo: req.body.Modelo,
Estatus: req.body.Estatus




      
      
      
      
      
   
    };
    DataModel.insert(userData, (err, data) => {
    try {
      if (data && data.insertId) {
        res.status(200).json({
          success: true,
          msg: "Inserted a new user",
          data: data
        });
        // res.redirect('/remolques/' + data.insertId);
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

  app.put('/remolques/:id', (req, res) => {
    const userData = {
      Id: req.params.id,
     
     
      Marca: req.body.Marca,

      tipo: req.body.Tipo,
 
      Anio:req.body.Anio,
      CapacidadCarga:req.body.CapacidadCarga,
      NumeroChasis: req.body.NumeroChasis,

      Modelo: req.body.Modelo,
Estatus: req.body.Estatus


   
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

  app.delete('/remolques/:id', (req, res) => {
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
