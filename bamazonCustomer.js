var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon",
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) throw (err);
    console.log("Connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
        }
        console.log("---------------------------------------");
        question();
        // connection.end();
    });
}

function question() {
    inquirer.prompt([
        {
            name: "askID",
            type: "input",
            message: "What product id would you like to purchase?",
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            filter: Number
        }
    ])
        .then(function (answer) {
            var id = answer.askID;
            var query = connection.query(
                "SELECT * From products WHERE item_id = ?", [id], function (err, res) {
                    if (err) throw err;
                // if (res[i].stock_quantity > answer.quantity) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("There are " + res[i].stock_quantity + " in stock!\n");
                        console.log("You owe " + res[i].stock_quantity * answer.quantity);
                    }
                    // } else {
                        //     console.log("We do not have enough in stock!");
                        //     return;
                        // }
                    }
                    )
                })
            }

// function quantity() {
//     inquirer.prompt([

//     ])
//     .then(function (answer) {
//         console.log("you owe: " + answer.quantity * res[i].stock_quantity)
//     })

// }

// var display = function () {
//     var query = "Select * from products";
//     connection.query(query, function (err, res) {
//         if (err) throw (err);
//         var displayTable = new Table({
//             head: ["Item Id", "Product Name", "Category", "Price", "Quantity"],
//             colWidths: [10, 25, 25, 10, 14]
//         });
//         for (var i = 0; i < res.length; i++) {
//             displayTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
//         }
//         console.log(displayTable.toString());
//         productID();

//     })
// }

// function productID() {
//     inquirer
//         .prompt([
//             {
//                 name: "askID",
//                 type: "input",
//                 message: "What product id would you like to purchase?",
//                 filter: Number
//             },
//             // {
//             //     name: "Quantity",
//             //     type: "input",
//             //     message: "How Many items would you like to purchase?",
//             //     filter: Number,
//             //     validate: function (value) {
//             //         if (isNaN(value) === false) {
//             //             return true;
//             //         }
//             //         return false;
//             //     }
//             // }
//         ])
//         .then(function (answer) {
//             var need = answer.Quantity;
//             var id = answer.askID;
//             connection.query(
//                 "SELECT * FROM products WHERE item_id = " + id, function (err, res) {
//                     // if (err) throw err;
//                     if (need <= res[0].stock_quantity) {
//                         order(needed, id);
//                     } else {
//                         connection.end();
//                     }
//                 }
//             )
//         });
// }

// function order(id, needed) {

//     // connection.query('SELECT * FROM products WHERE item_id = ' + id, function (err, res) {
//     //     // if (err) throw err;
//     //     if (needed <= res[0].stock_quantity) {
//     console.log("\nWe're in stock!\n");
//     console.log("Total Cost: $" + res[0].price * needed);

//     connection.query("UPDATE products Set stock_quantity = stock_quantity - " + needed + "WHERE item_id = " + id)
//     //     } else {
//     //         console.log("Not enough quantity, we do not have enought " + res[0].product_name + " to complete your order.");
//     //     };
//     //     display();
//     // })
// }
// display();