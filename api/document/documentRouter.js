const express = require('express');
const DocumentUpload = require('./documentModel')
const router = express.Router();

router.get('/', function(req, res){
    DocumentUpload.findAll()
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({message:err.message})
    })
})


router.post('/', async function(req,res){
  try{  console.log('tester',req.body)
    await DocumentUpload.createDocument(req.body)
        console.log('hello i made it out')
        res.status(200).json(document)
    } catch (err){
   
      
        res.status(500)
    }   
})

module.exports = router;

