const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private 
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single user by Id
// @route     GET /api/v1/users/:id
// @access    Private 
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private 
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private 
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});



// @desc      Update user
// @route     PUT /api/v1/users/ 
// @access    Private 
exports.updateUserLocation = asyncHandler(async (req, res, next) => {

  console.log({body : req.body})
  let phone = req.body.phone;

  let userToUpdate = await User.findOne({ phone : req.body.phone })
  console.log({userToUpdate})
  if(userToUpdate){
    const user = await User.findOneAndUpdate({ phone : req.body.phone }, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
  }else {
    res.status(404).json({
        success: false,
        data: user
    });
  }
});



// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private 
exports.deleteUser = asyncHandler(async (req, res, next) => {
  // await User.findByIdAndDelete(req.params.id);
  const user = await User.findById(req.params.id);
  if(user) await user.remove()

  res.status(200).json({
    success: true,
    data: {}
  });
});

