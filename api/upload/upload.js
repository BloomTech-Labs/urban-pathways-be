const express = require('express');
const router = express.Router();
const db = require('../../data/db-config')

router.post('/upload', async (req, res) => {
    const {name, data} = req.files.foo /* foo is declared in the name field of the input on the frontend */
    await db.insert({file_name: name, file: data}).into('files')
    .then(response => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
  });

  module.exports = router;