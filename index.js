const express = require('express')
const app = express()
const mysql = require('mysql')
const db = mysql.createConnection({
	host: "",
	user: "",
	password: "",
	database: "",
});
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySql Connected");
});
app.get("/createdb", (req, res) => {
	let sql = "CREATE DATABASE nodemysql";
	db.query(sql, (err) => {
		if (err) {
			throw err;
		}
		res.send("Database created");
	});
});
app.get("/createtable", (req, res) => {
	let sql =
		"CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255),salery VARCHAR(10), PRIMARY KEY(id))";
	db.query(sql, (err) => {
		if (err) {
			throw err;
		}
		res.send("Employee table created");
	});
});
app.get("/create-employee", (req, res) => {
	let post = { name: req.query.name, designation: req.query.post,salery:req.query.salery };
	let sql = "INSERT INTO employee SET ?";
	let query = db.query(sql, post, (err) => {
		if (err) {
			throw err;
		}
		res.send("Employee added");
	});
});

app.get("/search", (req, res) => {
	let name = req.query.name
	let sql = `SELECT * FROM employee WHERE name = '${name}'`;
	db.query(sql , (err,data) => {
		if (err) {
			throw err;
		}
		res.json(data[0]);
	});
});
app.listen("3000", () => {
	console.log("Server started on port 3000");
});
