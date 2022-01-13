const express = require('express')
const router = express.Router()
const { createUser, uploadPhoto, uploadDocument } = require('../controllers/user')

//create a user
router.route('/users').post(createUser)

//upload photo
router.route('/users/:id/photo')
.put(uploadPhoto) 
 
//upload document file
router.route('/users/:id/document').put(uploadDocument)


module.exports = router