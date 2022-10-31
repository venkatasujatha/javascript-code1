const Sequelize = require('sequelize');
const db = require('../database');

const student = require('../entity/student');
const pen =db.define('Pen', {
   
    id:{
        primaryKey:true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement:true,

    },
    brand:{
        type: Sequelize.DataTypes.STRING,
        allowNULL: false
    }
},{
    freezeTableName:true,
    timestamps:false,
})

module.exports = pen