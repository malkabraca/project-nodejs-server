const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
  idUserValidation,
  recommendationValidation,
  ProfailValidation,
} = require("../../validation/authValidationService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareUser = require("../../middleware/permissionsMiddlewareUser");

//register
//http://localhost:8181/api/auth/users
router.post("/users", async (req, res) => {
  try {
    
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
//http://localhost:8181/api/auth/users/login
router.post("/users/login", async (req, res) => {
  try {
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all users,admin
//http://localhost:8181/api/auth/users
router.get(
  "/users",
  async (req, res) => {
    try {
      const userData = await usersServiceModel.getAllUsers();
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//Get user,The registered user or admin
//http://localhost:8181/api/auth/users/:id
router.get(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const userData = await usersServiceModel.getUserdById(req.params.id);
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Edit user
// http://localhost:8181/api/auth/users/:id
router.put(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      await ProfailValidation(req.body);
      await usersServiceModel.updateUser(req.params.id,req.body);
      res.json({ msg: "Editing was done successfully" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Edit is admin user
// http://localhost:8181/api/auth/users/:id
router.patch(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false,true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      const bizUserID = req.params.id;
      let userData = await usersServiceModel.getUserdById(bizUserID);
      if (userData.isAdmin === true) {
        userData.isAdmin = false;
        userData = await userData.save();
        res.json({ msg: "Editing was done false successfully" });
      } else {
        userData.isAdmin = true;
        userData = await userData.save();
        res.json({ msg: "Editing was done true successfully" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//delete
//http://localhost:8181/api/auth/users/:id
router.delete(
  "/users/:id",
  authmw,
  permissionsMiddlewareUser(false, true, true),
  async (req, res) => {
    try {
      await idUserValidation(req.params.id);
      await usersServiceModel.deleteUser(req.params.id);
      res.json({ msg: "delete" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//http://localhost:8181/api/auth/users/contact/:id
router.patch(
  "/users/contact/:id",
  authmw,
  permissionsMiddlewareUser(true,false, true),
  async (req, res) => {
    try {
      await recommendationValidation(req.body);
      await idUserValidation(req.params.id);
      const updatedCard = await usersServiceModel.updateUser(
        req.params.id,
        req.body
      );
      res.json(updatedCard);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);


module.exports = router;
