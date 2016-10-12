'use strict';

const { Database } = require('sqlite3').verbose()
const db = new Database('db/Chinook_Sqlite.sqlite')

db.serialize(() => {
  // db.all(`
  //   SELECT
  //     FirstName || ' ' || LastName AS 'Name',
  //     CustomerId,
  //     Country
  //   FROM
  //     Customer
  //   WHERE Country IS NOT 'USA'
  //   `, (err, customers) => {
  //     console.log(customers)
  //   }
  // )
  db.all(`
    SELECT
      FirstName || ' ' || LastName AS 'Name',
      CustomerId,
      Country
    FROM
      Customer
    WHERE Country IS 'Brazil'
    `, (err, customers) => {
      customers.forEach((element, index) => {
        let _id = element.CustomerId
        let name = element.Name
        let country = element.Country
        console.log(`${_id}: ${name} (${country})`)
      })
    }
  )
})

db.close()
