
var express = require('express');
var router = express.Router();
var Alert = require('../models/alert.model.js');
// tool which allows the router to actually extract the data that it takes in
var bodyParser = require('body-parser');

router.use(bodyParser.json());
// opens up the 'package' of information in the url and formulates it so you can actually see what the server is sending to you
router.use(bodyParser.urlencoded({extended: true}));

// performing CRUD functions from the router
 // - use plural 'alerts' as it is assumed this will be a collection as there is implicitly more than one alert
router.get('/alerts', function(req, res){
  Alert.find({}, function(err, foundAlerts){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      alerts: foundAlerts
    });
  });
});
router.get('/alerts/:id', function(req, res){
  Alert.find({_id: req.params.id}, function(err, foundAlert){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      alert: foundAlert
    });
  });
});
router.post('/alerts', function(req, res){
  console.log(req.body);
  var alert = new Alert(req.body);
  alert.save(function(err){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(201).json({
      msg: 'Successfully created alert'
    });
  });
});
router.put('/alerts/:id', function(req, res){
  Alert.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldAlert){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: oldAlert
    });
  });
});
router.delete('/alerts/:id', function(req, res){
  Alert.findOneAndRemove({_id: req.params.id}, function(err, deletedAlert){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: deletedAlert
    });
  });
});

module.exports = router;
