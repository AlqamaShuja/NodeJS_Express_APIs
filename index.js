const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/users");
const messageRouter = require("./routers/message");

const app = express();


//MongoDB connection
mongoose.connect("mongodb+srv://alqamashuja313:12345678@9@cluster0.5hvec.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Middleware
app.use(express.json());
app.use(userRouter);
app.use(messageRouter); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Running on port ", port);
});
