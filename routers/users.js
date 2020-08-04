const express = require("express");
const Users = require("../models/users");

const app = express();


//create new user (register user for the first time) 
app.post("/register", async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    return res.status(200).send({ user });
  } catch (e) {
    return res.status(400).send(e);
  }
});


//
app.post("/register/:id", async (req, res) => {
  const userId = req.params.id;
  const user = req.body;

  //check user already registered or not.
  const userFound = await Users.findById(userId);
  if(userFound){
    //if user found then update user socket id
    userFound.socketId = user.socketId;

    try {
      await userFound.save();
      return res.status(200).send({ userFound });
    } catch (e) {
      return res.status(400).send(e);
    }
  } 

  //if user not found which means users is not registered yet so register user
  try {
    const newUser = new Users(user);
    await newUser.save();
    return res.status(201).send({ newUser });
  } catch (e) {
    res.status(400).send(e);
  }
});


//return all users
app.get("/users", async (req, res) => {
  try{
    const users = await Users.find({});
    res.send(users);
  }catch (e) {
    res.status(500).send(e);
  }
});


module.exports = app;
