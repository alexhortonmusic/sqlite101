'use strict';

const { Database } = require('sqlite3').verbose()
const Table = require('cli-table')
const db = new Database('db/Chinook_Sqlite.sqlite')

db.serialize(() => {
  // 1
  db.all(`
    SELECT
      FirstName || ' ' || LastName AS 'Name',
      CustomerId,
      Country
    FROM
      Customer
    WHERE Country IS NOT 'USA'
    `, (err, customers) => {
      // console.log(customers)
    }
  )

  // 2
  db.all(`
    SELECT
      FirstName || ' ' || LastName AS 'Name',
      CustomerId,
      Country
    FROM
      Customer
    WHERE Country IS 'Brazil'
    `, (err, customers) => {
      customers.forEach((element) => {
        let _id = element.CustomerId
        let name = element.Name
        let country = element.Country
        // console.log(`${_id}: ${name} (${country})`)
      })
    }
  )
  // same as above, but .each does forEach for you
  db.each(`
    SELECT
      FirstName || ' ' || LastName AS 'Name',
      CustomerId,
      Country
    FROM
      Customer
    WHERE Country IS 'Brazil'
    `, (err, { CustomerId, Name, Country }) => {
      // console.log(`${CustomerId}: ${Name} (${Country})`)
    })
  // 3 Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country.
  let table = new Table({
    head: ['InvoiceId', 'Name', 'BillingCountry', 'InvoiceDate'],
    colWidths: [15, 20, 20, 30]
  });

  db.each(`
    SELECT
      Customer.FirstName || " " || Customer.LastName AS "Name",
      Invoice.InvoiceId,
      Invoice.InvoiceDate,
      Invoice.BillingCountry
    FROM
      Invoice
    JOIN
      Customer
    ON
      Invoice.CustomerId = Customer.CustomerId
    WHERE Customer.Country = "Brazil"
    `, (err, { Name, InvoiceId, InvoiceDate, BillingCountry }) => {
      table.push([InvoiceId, Name, BillingCountry, InvoiceDate])
    }, () => {
      // console.log(table.toString())
  })

  let salesTbl = new Table({
    head: ['Agent Name'],
    colWidths: [20]
  });

  // 4 Provide a query showing only the Employees who are Sales Agents.
  db.each(`
    SELECT
      FirstName || " " || LastName AS "Name"
    FROM
      Employee
    WHERE
      Employee.Title = 'Sales Support Agent'
    `, (err, employee) => {
        let name = employee.Name
        salesTbl.push([name])
      }, () => {
        // console.log(salesTbl.toString())
      }
    )

  // 5 Provide a query showing a unique list of billing countries from the Invoice table.

  db.all(`
    SELECT DISTINCT
      BillingCountry
    FROM
      Invoice
    `, (err, earth) => console.log(earth)
  )

})

db.close()

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'db/Chinook_Sqlite.sqlite',
  },
  useNullAsDefault: true
})

// 5 Provide a query showing a unique list of billing countries from the Invoice table.





// 6 Provide a query showing the invoices of customers who are from Brazil.


// 7 Provide a query that shows the invoices associated with each sales agent. The resultant table should include the Sales Agent's full name.
