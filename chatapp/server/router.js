const express = require('express')
const router = express.Router() //new router object, optional parameters inside could be for case sensitivity, mergeParams, strict routing.

router.get('/', (req,res) => {
    res.send( {response : 'Server is Running!'} ).status(200)
})

module.exports = router