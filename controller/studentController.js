
 const Student = require('../entity/student');
 const Pen = require('../entity/pen');

    
 //post
 const add = async (req, res) => {
    try {
        // const resp= await Student.create({firstName: req.body.firstName, lastName: req.body.lastName});
        const resp= await Student.create(req.body,{

            include:[{
    
                model:Pen
    
            }]
    
        });
        //const resp= await Student.create(req.body);
     //await resp.save();
     console.log(" record saved successfully");
     console.log(resp.toJSON());
     res.send(resp);
    }
    catch (err) {
        console.error(err.message);
    }
   
 }
//getall student
const getallStudent =async(req, res) => {
    try
    {
        const resp = await Student.findAll();
        res.send(resp);

    }
    catch (err)
    {
        console.error(err.message);
    }
    
}

//getone student

const getoneStudent =async(req, res) => {
    try {
        const resp = await Student.findByPk(req.params.id);
        res.send(resp);
        
    } catch (error) {
        console.error(error.message);
        
    }
}
//update student
const updateStudent = async(req, res) => {
    try {
        const resp = await Student.update(req.body,{where:{id:req.params.id}});
        res.send(resp);
        
    } catch (error) {
        console.error(error.message);
    }
}
//delete student
const deleteStudent = async(req, res) => {
    try{
        await Student.destroy({where:{id:req.params.id}});
        console.log('Student deleted successfully')
    }
    catch (error) {
        console.error(error.message);
    }
   
}

//bulk create students
const bulkCreateStudent = async(req,res)=>{
try {
    const resp = await Student.bulkCreate(req.body,{
        include:[{
            model:Pen
        }]
    })
    console.log("Students created successfully");
    res.send(resp);
    
} catch (error) {
    console.error(error.message);
    
}
}

//bulk update the students
const bulkUpdateStudent =async (req, res) => {
    try {
        // const resp= await Student.bulkCreate(req.body,{upsertKeys:[{id:req.body.id}] ,
        // updateOnDuplicate: ["firstName","lastName"]})
        // res.send(resp);
        // console.log(resp);
        
        const resp = await Student.update({lastName:req.body.lastName},{where: {firstName:req.params.firstName}});
        res.send(resp);
    } catch (error) {
        console.error(error.message);
    }
}
//bulk delete
const bulkDelete = async (req, res) => {
    try {
        // await Student.destroy({where:{}});
    //console.log("records deleted successfully");
   const resp= await Student.destroy({where:{firstName:req.params.firstName}});


        console.log("Students deleted successfully");

    } catch (error) {
        console.log(error.message)
        
    }
    
}
 module.exports ={add,getallStudent,getoneStudent,updateStudent,deleteStudent,bulkCreateStudent,bulkUpdateStudent,bulkDelete}