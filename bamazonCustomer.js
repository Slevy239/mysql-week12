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
        // console.log(res);
        connection.end();
    })
}

var display = function () {
    var query = "Select * from products";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        var displayTable = new Table({
            head: ["Item Id", "Product Name", "Category", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(displayTable.toString());
        productID();

    })
}

function productID() {
    inquirer
        .prompt([
            {
            name: "askID",
            type: "input",
            message: "What product ID would you like to purchase?",
            filter: Number
        },
        {
            name:"Quantity",
            type: "input",
            message: "How Many items would you like to purchase?",
            filter: Number
        },
        ])
        .then(function (answer) {
            var needed = answer.Quantity;
            var ID = answer.askID;
            order(needed, ID);
        });
    }

    function order() {
        connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(err, res) {
            if (err) throw err;
            if  (needed <= res[0].stock_quantity) {
                var cost = res[0].price * needed;
                console.log("We're in stock!");
                console.log("Total Cost: $" + cost);

                connection.query("UPDATE products Set stock_quantity = stock_quantity - " + needed + "WHERE item_id = " + ID )
            } else {
            console.log("Not enough quantity, we do not have enought " + res[0].product_name + " to complete your order.");
            };
            display();
        })
    }
    display();