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

const breakage = '\r\n==========================================\n\r'
connection.connect(err => {
  if (err) throw err
  console.log(`Connected with id: ${connection.threadId}\n`)

  startUp()
})

const startUp = function() {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        message: 'Choose your dirge:',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product'
        ],
        name: 'dirge'
      }
    ])
    .then(answers => {
      switch (answers.dirge) {
        case 'View Products for Sale':
          showAllTheThings()
          break

        case 'View Low Inventory':
          showTheLowThings()
          break

        case 'Add to Inventory':
          addToTheThings()
          break

        case 'Add New Product':
          addCompletelyNewThing()
      }
    })
    .catch(err => console.log(err))
}

const showAllTheThings = function() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    (err, res) => {
      if (err) throw err
      console.table(res)
      setTimeout(() => {
        justMakeItStaup()
      }, 2 * 1000)
    }
  )
}

const showTheLowThings = function() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5',
    (err, res) => {
      console.table(res)
      setTimeout(() => {
        justMakeItStaup()
      }, 2 * 1000)
    }
  )
}

const showTheLowThingsManual = function() {
  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5',
    (err, res) => {
      console.table(res)
    }
  )
}
const addToTheThings = function() {
  showTheLowThingsManual()
  console.log(breakage)

  inquirer
    .prompt([
      {
        message: 'Type the item_id you wish to restock',
        name: 'restockId',
        type: 'input',
        validation: function(value) {
          if (!isNAN(value) && Number.isInteger(value)) {
          } else {
            console.log('Invalid input. Please select a valid item_id.')
          }
        }
      },
      {
        message:
          'Type the amount you wish to add to the current stock of selected item.',
        name: 'restockAddAmount',
        type: 'input',
        validation: function(value) {
          if (!isNAN(value) && Number.isInteger(value)) {
          } else {
            console.log('Invalid input. Please input a number.')
          }
        }
      }
    ])
    .then(answers => {
      const myQuery = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
      const options = [
        parseInt(answers.restockAddAmount),
        parseInt(answers.restockId)
      ]
      connection.query(myQuery, options, (err, res) => {
        if (err) throw err
        console.log(`Stock for item_id ${answers.restockId} updated`)
        console.log(breakage)
      })
    })
    .then(stuff => {
      setTimeout(() => {
        justMakeItStaup()
      }, 5 * 1000)
    })
    .catch(err => console.log(err))
}

let addCompletelyNewThing = function() {
  inquirer
    .prompt([
      {
        message: 'Type the name of the new product:',
        name: 'product_name',
        type: 'input'
      },
      {
        message: 'Type the department name:',
        name: 'dep_name',
        type: 'input'
      },
      {
        message: 'Type the price of the new product:',
        name: 'product_price',
        type: 'input',
        validation: function(value) {
          if (!isNAN(value) && Number.isInteger(value)) {
          } else {
            console.log('Invalid input. Please input a number.')
          }
        }
      },
      {
        message: 'Type the amount of the current stock of the new product:',
        name: 'stockAmount',
        type: 'input',
        validation: function(value) {
          if (!isNAN(value) && Number.isInteger(value)) {
          } else {
            console.log('Invalid input. Please input a number.')
          }
        }
      }
    ])
    .then(answers => {
      let myQuery =
        'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)'

      let options2 = [
        answers.product_name,
        answers.dep_name,
        parseInt(answers.product_price),
        parseInt(answers.stockAmount)
      ]

      connection.query(myQuery, options2, (err, res) => {
        if (err) throw err
        console.log(`New Product: ${answers.product_name} Successfully Added`)

        //show all the things without a prompt
        connection.query(
          'SELECT item_id, product_name, price, stock_quantity FROM products',
          (err, res) => {
            if (err) throw err
            console.table(res)
          }
        )
        justMakeItStaup()
      })
    })
}

const justMakeItStaup = function() {
  console.log(breakage)
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: "Have you more to do? Type 'YES', otherwise 'NO'" + breakage,
        default: true,
        name: 'stopOrNot'
      }
    ])
    .then(answers => {
      if (answers.stopOrNot === false) {
        console.log('\nYour dirge is over... find some sunlight!')
        connection.end()
      } else {
        startUp()
      }
    })
    .catch(err => console.log(err))
}
