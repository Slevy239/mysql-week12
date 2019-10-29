var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

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
});
function display() {
    connection.query("SELECT * FROM products", function(err, res) {
if (err) throw err;
        var table = new Table({
            head: ["ID", "ITEM NAME", "CATEGORY", "COST", "QUANTITY"],
            colWidths: [10, 15, 15, 10],
            colAligns: ["center", "left"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString())
        question();
    })
}


// function afterConnection() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw (err);
//         console.log(" ID | ITEM NAME   | TYPE   | $     | QUANTITY")
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
//         }
//         console.log("---------------------------------------");
//         question();
//     });
// }

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
                    if (answer.quantity <= res[0].stock_quantity) {
                        for (var i = 0; i < res.length; i++) {
                            console.log("There are " + res[i].stock_quantity + " in stock!\n");
                            console.log("You owe $" + res[i].price * answer.quantity);
                        }
                        var newQuantity = res[0].stock_quantity - answer.quantity;
                        connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE item_id = " + res[0].item_id, function(err, resUpdate) {
                            if (err) throw err;
                            console.log("\nINVENTORY UPDATED");
                            display();
                            connection.end();
                        })
                    } else {
                        console.log("\nInsufficient quantity of " + res[0].stock_quantity + "!")
                        console.log("We only have " + res[0].stock_quantity + " in stock!");
                        console.log("Please try again!");
                        connection.end();
                    }
                })
        })

}


display();