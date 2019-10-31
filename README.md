# mysql-week12

## Setup

For this application to run, MySQL database must be installed on your computer. Once installation is complete, copy the code in the [Bamazon.sql file](../mysql-week12/bamazon.sql) and paste it into MySQL Workbench to create the data and table. Following the installation, you will need to find the file location in the terminal and run 'npm i'. this will download all of the dependencies for this application. Afther completion of installs, you will be able to run this application in the terminal.

## Getting Started

To begin, run the command "node bamazonCustomer.js" in the terminal.
This application will display the current inventory of the Bamazon Marketplace and will prompt initial questions.
The first question will ask about the ID of the item that you would like to purchase. This can be seen in the first screenshot:

![first screenshot](./screenshots/initial.png)


## Purchasing an Item

The second prompt will ask the quantity of the item that you are purchasing. This can be seen in the second screenshot:

![Second screenshot](./screenshots/secondPrompt.png)


## Updating the inventory 
 
 Once both prompts are complete, the database will be updated with the new amount of inventory, which can be seen in the third screenshot: 

 ![third screenshot](./screenshots/completeTransaction.png)



 ## MySQL Database

 This screenshot displays the code within the MySQL workbench that sets up the inventory table:

 ![mySQL](./screenshots/mysql.png)