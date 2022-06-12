const express = require("express");
const router = express.Router();

// Controllers
const listController = require('../controllers/list.controller')

router.get('/', (req, res, next) => {
  console.log('hola desde routes Api');
  res.status(200).json({ ok: true })
})

router.post ('/list',    listController.create)
router.get  ('/list',    listController.find)

// single column
router.post ('/dndlist', listController.createDND) // to do only once
router.get  ('/dndlist', listController.findDND)
router.patch('/dndlist', listController.patchDND)

// multiple column
router.post ('/dndmultiple', listController.createDNDmultiple) // to do only once
router.get  ('/dndmultiple', listController.findDNDmultiple)
router.patch('/dndmultiple', listController.patchDNDmultiple)

module.exports = router