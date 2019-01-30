const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.SQLUSER,
  password: process.env.SQLPW,
  database: 'bamazon_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log(`Connected with id: ${connection.threadId}`);

  startUp();
  connection.end();
});

function startUp() {
  console.log('Here are our products...');

  let sqlQuery =
    'SELECT (item_id, product_name, price, stock_quantity) FROM products;';
  let query = connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  // inquirer.prompt([{}]);
}
