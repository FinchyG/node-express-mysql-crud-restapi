const mysql = require('mysql2');

// connection configurations
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'OdoDS9Warf!Tuvok?',
  database: 'demo'
});

// connect to database
connection.connect(function (err) {
  if (err)
    throw err
  console.log('You are now connected with mysql database...')
})

// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    return res.status(400).send({
      message: "Todo description can not be empty"
    });
  }

  var params = req.body;
  console.log(params);

  connection.query("INSERT INTO todos SET ? ", params,
          function (error, results, fields) {
            if (error)
              throw error;
            return res.send({
              data: results,
              message: 'New todo has been created successfully.'
            });
          });
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
  connection.query('SELECT * FROM todos',
          function (error, results, fields) {
            if (error)
              throw error;
            res.json(results);
          });
};

// Update a todo identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.description) {
    return res.status(400).send({
      message: "Todo description can not be empty"
    });
  }

  connection.query('UPDATE `todos` SET `name`=?,`description`=? WHERE `id`=?',
          [req.body.name, req.body.description, req.params.id],
          function (error, results, fields) {
            if (error)
              throw error;
            res.json(results);
          });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
  connection.query('DELETE FROM todos WHERE Id=?',
          [req.params.id], function (error, results, fields) {
    if (error)
      throw error;
    res.end('Record has been deleted!');
  });
};