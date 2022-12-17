const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rest_api_node_js'
})

exports.db = db;