const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.SQL_USER,
  password: process.env.SQL_PW,
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
    'SELECT item_id, product_name, price, stock_quantity FROM products';
    
  let query = connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.table(res);

    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Which product would you like to buy? (enter item_id)',
          name: 'purchase_id'
        },
        {
          type: 'input',
          message: 'How many of the item would you like to buy?',
          name: 'purchase_amount'
        }
      ])
      .then(answers => {
        const queryNow =
          'SELECT `stock_quantity` FROM `products` WHERE `item_id` = ?';
        connection.query(
          queryNow,
          [answers.purchase_id],
          (err, res, fields) => {
            console.table(res);
            console.log(res);
            console.log(answers);
            console.table(answers);
          }
        );
      });
    // .catch(err => console.log(err));
  });
}
