const {Sequelize}= require('sequelize')

const db = require('../database');

const pen = require('../entity/pen');
const student =db.define('Student', {
   
    id:{
        primaryKey:true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement:true,

    },
    firstName:{
        type: Sequelize.DataTypes.STRING,
        //unique:true,
        allowNull: false,
    },
    lastName:{
        type: Sequelize.DataTypes.STRING,
        //unique:true,
        allowNull: false,
    }
},{
    freezeTableName:true,
    timestamps:false,
})

 student.hasOne(pen,{
     foreignKey:"StudentId",allowNull:false});
 pen.belongsTo(student,{foreignKey:"StudentId",allowNull:false});



module.exports = student