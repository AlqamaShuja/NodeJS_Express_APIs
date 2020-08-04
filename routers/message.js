const express = require("express");
const Message = require("../models/message");

const app = express();
const objectId = require("mongodb").ObjectID;

//create new message
app.post('/message', async (req, res) => {
    const message = req.body;
    // if(message.body.length === 0){
    //     return new Error("Message body can not be empty.");
    // }
    // if(!message.receiverId) {
    //     return new Error("Please enter receiver's Id");
    // }

    try {
        const newMessage = new Message(message);
        await newMessage.save();
        res.status(200).send({ newMessage });
    } catch (error) {
        res.status(400).send(error);
    }
});


//return all the message which belongs to the given id.
app.get("/messages/:senderId/:receiverId", async (req, res) => {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    try {
        const senderMessage = await Message.find({ senderId: objectId(senderId), receiverId: objectId(receiverId) });
        const receiverMessage = await Message.find({ receiverId: objectId(senderId), senderId: objectId(receiverId) });
        return res.status(302).send(allMessage = senderMessage.concat(receiverMessage));
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = app;