const { db } = require('../../../scripts/seed/db');
const data = require('./data.json');

const query = `
  INSERT INTO employee(full_name, gender, active, position)
  VALUES($1, $2, $3, $4)
  RETURNING *
`;

data.map(function (item) {
  const values = [item.fullName, item.gender, item.active, item.position];

  db.query(query, values, function (err, result) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(result.rows[0]);
    }
  });
});
