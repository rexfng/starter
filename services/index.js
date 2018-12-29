const express = require('express')
const router = express.Router()

/* Routing begins here */

const MongoDB = require('@rexfng/db').routes

router.use('/api/v1/db', MongoDB.list)
router.use('/api/v1/db', MongoDB.get)
router.use('/api/v1/db', MongoDB.gets)
router.use('/api/v1/db', MongoDB.post)
router.use('/api/v1/db', MongoDB.put)
router.use('/api/v1/db', MongoDB.del)

module.exports = router