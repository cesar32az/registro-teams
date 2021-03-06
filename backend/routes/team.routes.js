const express = require('express');
const app = express();
const teamRoute = express.Router();

// modelo de team
let Team = require('../model/Teams');

// agregar Team
teamRoute.route('/add-team').post((req, res, next) => {
  Team.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// obtener todos los teams
teamRoute.route('/').get((req, res) => {
  Team.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get solo un team con el id
teamRoute.route('/read-team/:id').get((req, res) => {
  Team.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Actualizar team
teamRoute.route('/update-team/:id').put((req, res, next) => {
  Team.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Team correctamente actualizado!')
    }
  })
})

// borrar team team
teamRoute.route('/delete-team/:id').delete((req, res, next) => {
  Team.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = teamRoute;
