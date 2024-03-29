const { where } = require('sequelize');
const Chat = require('../models/chat');
const { Op } = require('sequelize');

exports.postchat = async (req, res, next) => {
    try {
        await Chat.create({
            message: req.body.text,
            signupId: req.user.id,
            signupName: req.user.nam,
            groupId:req.query.groupid,
            time:new Date().getTime(),
        })
        res.status(201).json({ message: 'Succesfully sent text' });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err, success: false })
    }
}

exports.getchat = async (req, res, next) => {
    try {
        const currentTime = req.query.currenttime;
        const groupId = req.query.groupid || null; 
        const messages = await Chat.findAll({
      where: {
        time: {
          [Op.gt]: currentTime
        },
        groupId: groupId
      }
    });
        res.status(201).json({ success: true, message: messages });
    }
    catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}