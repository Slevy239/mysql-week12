var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "David239",
    database: "bamazon",
    insecureAuth: true
});

connection.connect(function(err) {
    if (err) throw (err);
    console.log("Connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection() {
    connection.query("SELECT * FROM products" , function(err, res) {
        if (err) throw (err);
        console.log(res);
        connection.end();
    })
}

var display = function() {
    var query = "Select * from products";
    connection.query(query, function(err, res) {
        if (err) throw (err);
        var displayTable = new Table ({
            head: ["Item Id", "Product Name", "Category", "Price", "Qunatity"],
            colWidths: [10,25,25,10,14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(displayTable.toString());

    })
}
display();