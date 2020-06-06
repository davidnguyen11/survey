const { db } = require('../../../scripts/seed/db');
const data = require('./data.json');

const query = `
  INSERT INTO account(username, password, full_name)
  VALUES($1, $2, $3)
  RETURNING *
`;

data.map(function (item) {
  const values = [item.username, item.password, item.full_name];

  db.query(query, values, function (err, result) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(result.rows[0]);
    }
  });
});
