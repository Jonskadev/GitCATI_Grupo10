var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Jonska',
    password: '2Muertilliwis',
    database: 'ADSW-Proyecto'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})
