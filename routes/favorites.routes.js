const express = require('express')
const router = express.Router();

const favoritesController = require("../controllers/favorites.controller")

router.get('/findAll', favoritesController.findAll)
router.post('/create', favoritesController.create)

module.exports = router