const router = require("express").Router();
 const studentController = require("../controller/studentController");
 const penController = require("../controller/penController");
//student urls
 router.post('/addstudent',studentController.add);
 router.get('/getallStudents',studentController.getallStudent);
 router.get('/getone/:id',studentController.getoneStudent);
 router.put("/updateStudent/:id",studentController.updateStudent);
 router.delete("/deleteStudent/:id",studentController.deleteStudent);
 router.post('/bulkcreatestudents',studentController.bulkCreateStudent);
 //router.put('/bulkUpdateStudents/:firstName',studentController.bulkUpdateStudent);
 router.put('/bulkUpdateStudents',studentController.bulkUpdateStudent);
 //router.delete('/bulkdelete/:firstName',studentController.bulkDelete)
 router.delete('/bulkdelete',studentController.bulkDelete);
 router.post('/bulkTransancations',studentController.bulkTransactions);

 //router.put('/bulkUpdate',studentController.bulkUpdateStudent)
 


 //pen urls
 router.post('/addpen',penController.add);
 router.get('/getallpens',penController.getallpendetails);
 router.get('/getonependetails/:id',penController.getonePen);
 router.put('/updatePen/:id',penController.updatePen);
 router.delete("/deletepen/:id",penController.deletePen);
 router.post('/bulkcreatepens',penController.bulkCreatePen);

module.exports = router