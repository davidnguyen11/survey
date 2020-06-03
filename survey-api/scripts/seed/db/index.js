const { connect } = require('../../../scripts/seed/db/connect.js');
const pool = connect();

const db = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  },
};

module.exports = {
  db,
};
