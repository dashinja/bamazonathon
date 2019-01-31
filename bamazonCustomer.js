const mysql = require('mysql')
const inquirer = require('inquirer')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.SQL_USER,
  password: process.env.SQL_PW,
  database: 'bamazon_db'
})

connection.connect(err => {
  if (err) throw err
  console.log(`Connected with id: ${connection.threadId}\n`)

  startUp()
  // connection.end()
})

// Show products to user
const startUp = function() {
  console.log(`Here are our products...\n`)

  let sqlQuery =
    'SELECT item_id, product_name, price, stock_quantity FROM products'

  let query = connection.query(sqlQuery, (err, res) => {
    if (err) throw err
    console.table(res)

    data = res
    buyStuff()
  })
}

// Present user with purchase options
function buyStuff() {
  console.log('\n\n')
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
      // Hooray unnecessary convenience!!
      purchaseId = parseInt(answers.purchase_id) - 1
      purchaseAmount = parseInt(answers.purchase_amount)
      databaseAmount = data[purchaseId].stock_quantity

      if (purchaseAmount > databaseAmount) {
        console.log(
          `Insufficient Quantity! Inventory only has ${databaseAmount}\n`
        )
        buyStuff()
      } else {
        console.log('\nProcessing your order...')
        console.log(
          `Your total today is: $${purchaseAmount * data[purchaseId].price}\n`
        )

        // More unnecessary but sanity checking convenience!! Only $499!
        let newDBquantity = databaseAmount - purchaseAmount
        let options = [newDBquantity, answers.purchase_id]

        connection.query(
          'UPDATE products SET stock_quantity = ? WHERE item_id = ?',
          options,
          (error, results, fields) => {
            if (error) throw error
            justMakeItStaup()
          }
        )
      }
    })
    .catch(err => {
      return console.log(err)
    })
}

const justMakeItStaup = function() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'If you want to shop more, type "Yes"',
        default: false,
        name: 'stopOrNot'
      }
    ])
    .then(answers => {
      if (answers.stopOrNot === false) {
        console.log('\nThank you for shopping with us and have a great day!')
        connection.end()
      } else {
        startUp()
      }
    })
    .catch(err => console.log(err))
}
