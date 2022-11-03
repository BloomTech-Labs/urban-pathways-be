const { send } = require('./errorHandler');

const post = async (res, query, name, ...args) => {
    try {
      const data = await query(...args);
      res.status(201).json(data);
    } catch (error) {
      send(res, error, name);
    }
  };

  module.exports = {
    post
  }