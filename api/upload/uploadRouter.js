const express = require('express');
const router = express.Router();
const db = require('../../data/db-config')
const multer = require('multer')
const crypto = require('crypto')

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require('dotenv').config()

const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage})

// router.get('/posts', async (req, res) => {
//   const files = await --> insert model <--

//   for(const file of files){
//     const getObjectParams = {
//       Bucket: bucketName,
//       Key: file.fileName,

//     }
//     const command = new GetObjectCommand(getObjectParams);
//     const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
//     file.fileURL = url
//   }
// })

router.post('/getSignedURL', upload.single('image'), async (req, res) => {
    req.file.buffer

    const fileName = randomFileName()

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 500,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    s3.getSignedUrl(command, (err, data) => {
      if (err){
        res.json({success: false, error: err})
      }
      const returnData = {
        signedRequest: data,
        url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
      }
      res.json(returnData)
    }) //time stamp
  }); 
  
  // await db.insert({fileName: fileName, fileTitle: req.body.title, s3URL: req.file.url}).into('files') -- move to another end point

  //test with html + script
  //

  // router.delete('/posts/:id', async (req, res) => {
  //   
  // })

  module.exports = router;