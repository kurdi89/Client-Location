const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserLocation,
  deleteUser,
} = require('../controllers/users');

const User = require('../models/User');
const advancedResults = require('../middleware/advancedResults');

// router
const router = express.Router({ mergeParams: false });


// Routes 
router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

// router
//   .route('/:id')
//   .get(getUser)
//   .put(updateUser)
//   .delete(deleteUser);

router
  .route('/updateLocation')
  .put(updateUserLocation)

module.exports = router;
