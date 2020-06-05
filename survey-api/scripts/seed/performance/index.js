const { db } = require('../../../scripts/seed/db');
const data = require('./data.json');

const query = `
  INSERT INTO performance(content, rating, employee_id)
  VALUES($1, $2, $3)
  RETURNING *
`;

data.map(function (item) {
  const values = [item.content, item.rating, item.employee_id];

  db.query(query, values, function (err, result) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(result.rows[0]);
    }
  });
});
