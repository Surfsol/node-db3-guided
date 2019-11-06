# Problem

A client has hired you to track zoo animals.
For each animal, you must track their name, species, and all zoos in which they have resided (including zoo name and address).

Determine the database tables necessary to track this information.

Label any relationships between table.

select Employee.FirstName, [Order].*
from [Order]
join Employee on [Order].EmployeeId = Employee.Id

select 

foreign key: A FOREIGN KEY is a key used to link two tables together.
A FOREIGN KEY is a field (or collection of fields) in one table that refers to the PRIMARY KEY in another table. The table containing the foreign key is called the child table, and the table containing the candidate key is called the referenced or parent table.

inner join - most common way to join.  The INNER JOIN keyword selects records that have matching values in both tables.
only one primary key.  ex. customer info
foregin key value can be repeated. ex. customer orders

select * 
from orders 
join customers on orders.customerId = customers.custormerId


select * 
from orders as o
join customers as c on o.customerId = c.custormerId
join shippers as s on o.shipperId = s.shipperId
order by o.customerId

select c.customerName as Customer
, c.contactName as Contact
, s.phone as ShipperPhone
, s.shippername as [Delivered By]
, o.orderid
from orders as o
join customers as c on o.customerId = c.custormerId
join shippers as s on o.shipperId = s.shipperId
order by o.customerId


-- list of All customers and orders
//brings all customers, does not necessarily need to find corresponding data from 
//orders table
select *
from customers as c
left join orders as o on c.customerId = o.customerId
order by c.customerId


// take catId, count total for each catId and label as Count
select categoryId, count(*) as Count 
//from table products
from products
//first group by catId
group by categoryId


// now add a column showing cheapest product
select categoryId, count(*) as Count, min(price) as Cheapest 
//from table products
from products
//first group by catId
group by categoryId

//from above, average price per cat
avg(price) as [Average Price]

select categoryId
, categoryName as Category
, count(*) as Count
, round(min(p.price),2) as Cheapest 
, round(avg(p.price),2) as AveragePrice
from products as p
from categories as c on p.categoryId = c.categoryId
group by c.categoryId


seperate framework code from rest of app.
express should interact with outside world.  
seperate db code from router, cause you might not want to use express

seperate db access layer

users/ users-model.js