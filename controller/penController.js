const Pen =require("../entity/pen");
//const Student =require("../entity/student");
//post
const add = async (req, res) => {
    try {
        // const resp= await Student.create({firstName: req.body.firstName, lastName: req.body.lastName});
       
        const pen= await Pen.create(req.body);
    
     //await resp.save();
     console.log(" data saved successfully");
     console.log(pen.toJSON());
    
     res.send(pen);
    }
    catch (err) {
        console.error(err.message);
    }
   
 }
 //getall pens
const getallpendetails =async(req, res) => {
    try
    {
        const resp = await Pen.findAll();
        res.send(resp);

    }
    catch (err)
    {
        console.error(err.message);
    }
    
}

//getone pen

const getonePen =async(req, res) => {
    try {
        const resp = await Pen.findByPk(req.params.id);
        res.send(resp);
        
    } catch (error) {
        console.error(error.message);
        
    }
}

//update pen
const updatePen = async(req, res) => {
    try {
        const resp = await Pen.update(req.body,{where:{id:req.params.id}});
        res.send(resp);
        
    } catch (error) {
        console.error(error.message);
    }
}

//delete pen
const deletePen = async(req, res) => {
    try{
        await Pen.destroy({where:{id:req.params.id}});
        console.log('pen deleted successfully')
    }
    catch (error) {
        console.error(error.message);
    }
   
}
//bulk create pens
const bulkCreatePen = async(req,res)=>{
    
    try
    {

       const resp= Pen.bulkCreate(req.body);
        console.log('Pens created successfully');
        res.send(resp);
    }
    catch(err)
    {
        console.log(err.message);
    }
}
 module.exports = {add,getallpendetails,getonePen,updatePen,deletePen,bulkCreatePen};