const mysql = require('mysql')
const inquirer = require('inquirer')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.SQLUSER,
  password: process.env.SQLPW,
  database: 'bamazon_db'
})

connection.connect(err => {
  if (err) throw err
  console.log(`Connected with id: ${connection.threadId}`)

  connection.end()
})
