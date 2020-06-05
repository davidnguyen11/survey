const { db } = require('../db');
const data = require('./data.json');

const query = `
  INSERT INTO reviewer_reviewee(reviewer_id, reviewee_id)
  VALUES($1, $2)
  RETURNING *
`;

data.map(function (item) {
  const values = [item.reviewer_id, item.reviewee_id];

  db.query(query, values, function (err, result) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(result.rows[0]);
    }
  });
});
