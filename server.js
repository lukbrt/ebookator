const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');
const User = require('./model/User');

const sqlite3 = require('sqlite3').verbose();
let db;
connectDb = () => { db = new sqlite3.Database('./db/database.db') };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', (req, res) =>
{
	connectDb();

	const { Login, Password, Email, Firstname, Surname } = req.body;
	const Salt = 'abc';

	console.log(req.body);

	// bcrypt.hash(req.body.password, 10, function(err, hash){
	// 	if(err) {
	// 	   return res.status(500).json({
	// 		  error: err.message
	// 	   });
	// 	}
	// 	else {
	// 	   const user = new User({
	// 		  _id: new  mongoose.Types.ObjectId(),
	// 		  email: req.body.email,
	// 		  password: hash    
	// 	   });
	// 	   user.save().then(function(result) {
	// 		  console.log(result);
	// 		  res.status(200).json({
	// 			 success: 'New user has been created'
	// 		  });
	// 	   }).catch(error => {
	// 		  res.status(500).json({
	// 			 error: err
	// 		  });
	// 	   });
	// 	}
	// });
	
	let query = `INSERT INTO User(Login, Password, Email, Salt, Firstname, Surname) 
	VALUES(?, ?, ?, ?, ?, ?)`;

	db.run(query, [Login, Password, Email, Salt, Firstname, Surname], function (err)
	{
		if (err)
		{
			// res.statusText = "Błąd rejestracji: " + err.message;
			// res.send("Błąd rejestracji: " + err.message);
			res.status(500).send({ message: err.message });
			return console.log(err.message);
		}

		res.send({message: "Zarejestrowano pomyślnie."});
	});

	db.close();
});

app.post('/login', (req, res) => {
	connectDb();
	const { Login } = req.body;
	const EnteredPassword = req.body.Password;

	let query = `SELECT * FROM User
    			WHERE Login = ?;`;

	db.all(query, [Login], (err, users) =>
	{
		if (err)
		{
			return console.error(err.message);
		}

		const dbUser = users[0];

		if (dbUser.Login === Login && dbUser.Password === EnteredPassword)
		{
			res.end("Zalogowano!");
			console.log("Zalogowano!");
		}
		else
		{
			res.end("NIE zalogowano!");
			console.log("NIE zalogowano!");
		}
	});

	db.close();
});

app.get('/books', (req, res) =>
{
	connectDb();
	let books = [];
	let query = `SELECT * FROM Ebook
              ORDER BY IdBook DESC;`;

	db.all(query, [], (err, rows) =>
	{
		if (err)
		{
			throw err;
		}
		rows.forEach(row =>
		{
			books.push({
				Title: row.Title,
				IdBook: row.IdBook,
				Path: row.Path,
				Thumbnail: row.Thumbnail
			})
		});
		res.send(books);
		// books = rows;
	});
	db.close();

	// res.send(books);
});

app.get('/cats', (req, res) =>
{
	connectDb();
	let query = `SELECT * FROM Genre;`;

	db.all(query, [], (err, genres) =>
	{
		if (err)
		{
			throw err;
		}

		res.send(genres);
	});

	db.close();
});

app.get('/book/:id', (req, res) =>
{
	connectDb();
	const { id } = req.params;

	let query = `SELECT * FROM Ebook
    	WHERE IdBook = ?;`;

	db.all(query, [id], (err, book) =>
	{
		if (err)
		{
			return console.error(err.message);
		}

		res.send(book[0]);
	});

	db.close();
});

app.get('/author/:id', (req, res) =>
{
	connectDb();
	const { id } = req.params;

	let query = `SELECT * FROM Author
    	WHERE IdAuthor = ?;`;

	db.all(query, [id], (err, author) =>
	{
		if (err)
		{
			return console.error(err.message);
		}

		res.send(author[0]);
	});

	db.close();
});


app.post('/api/world', (req, res) =>
{
	console.log(req.body);
	res.send(
		`I received your POST request. This is what you sent me: ${req.body.post}`,
	);
});

app.listen(port, () => console.log(`Listening on port ${port}`));