var router = require('express').Router()
var Songs = require('../models/song')
var Users = require('../models/user')
let session = require('../auth/sessions')

//get all users playlists
router.get('/playlists', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        res.status(401).send({ message: "Please Log in" })
      }
      Songs.find({
        userId: req.session.uid
      }).then(playlists => {
        res.status(200).send(playlists)
      })
    })
    .catch(err => {
      res.status(500).send({ message: "An Error occured" })
    })
})

router.get('/playlist/:id', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        res.status(401).send({ message: "Please Log in" })
      }
      Songs.findOne({
        _id: req.params.id
      }).then(playlists => {
        res.status(200).send(playlists)
      })
    })
    .catch(err => {
      res.status(500).send({ message: "An Error occured" })
    })
})

//new playlist
router.post('/new-playlist', (req, res) => {
  req.body.userId = req.session.uid
  Songs.create(req.body)
    .then(newList => {
      res.status(200).send(newList)
    })
    .catch(err => {
      res.status(400).send({ message: "An Error occured", err })
    })
})

//add to playlist
router.put('/playlist/:id', (req, res) => {
  Songs.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(list => {
      res.status(200).send(list)
    })
    .catch(err => {
      console.log(err)
      res.send(400).send({ message: "An error occured" })
    })
})

router.delete('/playlist/:id', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      Songs.findById(req.params.id)
        .then(list => {
          if (user._id != list.userId) {
            res.send(400).send({ message: "Thats not yours!" })
          }
          Songs.findByIdAndRemove(req.params.id)
            .then(data => {
              res.send("Successfully Removed")
            })
            .catch(err => {
              res.status(400).send({ message: "Something broke" })
            })
        })
        .catch(err => {
          res.status(400).send({ message: "Something broke" })
        })
    })
    .catch(err => {
      res.status(400).send({ message: "Please Log in" })
    })
})

router.delete('/end-demo/:id', (req, res) => {
  Songs.deleteMany({ "userId": req.params.id })
    .then(data => {
      req.session.destroy(() => {
        res.send({
          message: 'You have successfully been logged out. Please come back soon!'
        })
    
      })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}

