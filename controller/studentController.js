const Student = require("../entity/student");
const Pen = require("../entity/pen");
const db = require("../database");


//post

const add = async (req, res) => {
  const t = await db.transaction();
  try {
    // const resp= await Student.create({firstName: req.body.firstName, lastName: req.body.lastName});
    const resp = await Student.create(
      req.body,
      {
        include: [
          {
            model: Pen,
          },
        ],
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    console.log(" record saved successfully");

    console.log(resp.toJSON());

    res.send(resp);
  } catch (err) {
    await t.rollback();
    console.error(err.message);
  }
};
//getall student
const getallStudent = async (req, res) => {
  try {
    const resp = await Student.findAll({ transaction: t });
    res.send(resp);
    console.log(result);
    return resp;
  } catch (err) {
    console.error(err.message);
  }
};

//getone student

const getoneStudent = async (req, res) => {
  try {
    const resp = await Student.findByPk(req.params.id);

    res.send(resp);
  } catch (error) {
    console.error(error.message);
  }
};
//update student
const updateStudent = async (req, res) => {
  try {
    const resp = await Student.update(req.body, {
      where: { id: req.params.id },
    });

    res.send(resp);
  } catch (error) {
    console.error(error.message);
  }
};
//delete student
const deleteStudent = async (req, res) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });

    console.log("Student deleted successfully");
  } catch (error) {
    console.error(error.message);
  }
};

//bulk create students
const bulkCreateStudent = async (req, res) => {
  const t = await db.transaction();
  try {
    const resp = await Student.bulkCreate(
      req.body,
      {
        include: [
          {
            model: Pen,
          },
        ],
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    console.log("Students created successfully");
    res.send(resp);
    //console.log(result);
  } catch (error) {
    await t.rollback();
    console.error(error.message);
  }
};

//bulk update the students
const bulkUpdateStudent = async (req, res) => {
  try {
    // const resp= await Student.bulkCreate(req.body,{upsertKeys:[{id:req.body.id}] ,
    // updateOnDuplicate: ["firstName","lastName"]})
    // res.send(resp);
    // console.log(resp);

    // const resp = await Student.update({lastName:req.body.lastName},{where: {firstName:req.params.firstName}});
    // res.send(resp);
    var resp;
    const student1 = req.body;
    for (let i = 0; i <= student1.length - 1; i++) {
      resp = await Student.update(student1[i], {
        where: {
          id: student1[i].id,
        },
      });
    }

    res.status(200).json({
      result: resp,

      message: "students  updated successfully",
    });
  } catch (error) {
    console.error(error.message);
  }
};
//bulk delete
const bulkDelete = async (req, res) => {
    const t= await db.transaction();
  try {
    // await Student.destroy({where:{}});
    //console.log("records deleted successfully");
    // await Student.destroy({where:{firstName:req.params.firstName}});
    var resp;
    const student1 = req.body;
    for (let i = 0; i <= student1.length - 1; i++) {
      resp = await Student.destroy({
        where: {
          id: student1[i].id,
        },
      },{transaction:t});
    }
    await t.commit();

    console.log("Students deleted successfully");
  } catch (error) {
    await t.rollback();
    console.log(error.message);
  }
};

const bulkTransactions =async (req, res) => {
  let transaction;
    try {
        transaction = await db.transaction();
        
        await Student.create(req.body,{include: [
          {
            model: Pen,
          },
        ],  }, { transaction});

        await Student.destroy({ where: {id: req.params.id }, transaction });

        await Student.update(req.body, { where: {id: req.params.id }, transaction });

        await transaction.commit();

    } catch (err) {
        if(transaction) {
           await transaction.rollback();
        }
    }
}

module.exports = {
  add,
  getallStudent,
  getoneStudent,
  updateStudent,
  deleteStudent,
  bulkCreateStudent,
  bulkUpdateStudent,
  bulkDelete,bulkTransactions
};
