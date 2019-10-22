drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products (
item_id int(4) not null,
product_name varchar(100) not null,
department_name varchar(100) not null,
price decimal(10, 2) not null,
stock_quantity integer(100) not null,
primary key (item_id)
);


insert into products (item_id, product_name, department_name, price, stock_quantity)
values (101, "Ball", "soccer", 15.99, 99),
	(202, "Stick", "hockey", 69.99, 25),
	(303, "Hoop", "basketball", 200.00, 5),
	(404, "Bat", "baseball", 50.50, 25),
	(505, "Stick", "lacrosse", 100.00, 65),
	(606, "television", "electronics", 350.00, 75),
	(757, "Camera", "photography", 750.00, 5),
    (809, "Phone", "electronics", 999.99, 100),
	(999, "Xbox", "electronics", 600.00, 50),
    (111, "Laptop", "electronics", 999.99, 60);

select * from products





    


	

