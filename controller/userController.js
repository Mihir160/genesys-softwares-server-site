const { query } = require("express");
const mongoose = require("mongoose");
const User = require("../modals/userModal");



const userController = {
  registration: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
      if (!user) {
        return res.status("user not created");
      } else {
        return res.status("user added successfully");
      }
    } catch (error) {
      res.status(200).json({
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const userData = req.body;
      User.findOne(
        {
          email: req.body.email,
          password: req.body.password,
        },
        async function (err, data) {
          if (err) {
            console.log(err);
          } else {
            if (data) {
              res.send([data]);
            } else {
              res.send([]);
            }
          }
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  alluser: async (req, res) => {
    try {
      const data = await User.find({});
      res.send(data);
    } catch (error) {
      res.status(200).json({
        message: error.message,
      });
    }
  },
  adminUser:async(req,res)=>{
    try{
      const email = req.params.email;
      const query = {email}
      const user = await User.findOne(query);
      res.send(user)
    }catch (error) {
      res.status(200).json({
        message: error.message,
      });
    }
  },
};

module.exports = userController;