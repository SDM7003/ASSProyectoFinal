const express = require('express');
const routes = require('./routes');
const connection = require('./dbConnection');
const app = express();
const cors=require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
const port = 3000;
app.use(cors());
app.use(express.json());
router = express.Router();


app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

//Get all products
app.get('/products', (req, res) => {
  connection.query("SELECT * FROM products", function (error, users) {
    if (error) return res.status(500).send("Error of view users");
    res.status(200).json(users);
  });
});

//Get product info
app.get("/products/:id", function (req, res) {
  var id = parseInt(req.params.id);
  connection.query("SELECT * FROM products WHERE id = ?", [id], function (error, users) {
    if (error) return res.status(500).send("Error of view users");
    if (users.length == 0) return res.status(404).send("Error. User don't find");
    res.status(200).json(users[0]);
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = router;
