const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Chat=sequelize.define('chat',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
   message:{
     type:Sequelize.STRING,
     allowNull:false
    },
    time: {
      type: Sequelize.BIGINT,
      allowNull: false
  },
    signupName:{
     type:Sequelize.STRING,
     allowNull:false
   }, groupId:{
    type:Sequelize.INTEGER
   }
});

module.exports =Chat;