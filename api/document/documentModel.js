const db = require('../../data/db-config');



const findAll = async () => {
    return await db('documents');
  };

const createDocument = async (document) => {
    return await db('documents').insert(document).returning('*');
}

module.exports = { findAll, createDocument };



module.exports = {
    createDocument,
    findAll
  };