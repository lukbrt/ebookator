const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');
const User = require('./model/User');
const jwt = require('jsonwebtoken');

const multer  = require('multer')
// const upload = multer({ dest: 'docs/' })
const path = require('path')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'docs/')
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname) //Appending extension   Date.now() + path.extname(file.originalname)
	}
  })
  
const upload = multer({ storage: storage });
const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();
let db;
connectDb = () => { db = new sqlite3.Database('./db/database.db') };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/register', (req, res) =>
{
	connectDb();
	const { Login, Password, Email, Firstname, Surname } = req.body;
	const Salt = 'abc';

	console.log(req.body);

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(Password, salt);
	
	let query = `INSERT INTO User(Login, Password, Email, Salt, Firstname, Surname) 
	VALUES(?, ?, ?, ?, ?, ?)`;

	db.run(query, [Login, hash, Email, Salt, Firstname, Surname], function (err)
	{
		if (err)
		{
			res.status(500).send({ message: err.message });
			return console.log(err.message);
		}
		res.status(200).send({ message: "Zarejestrowano pomyślnie." });
	});

	db.close();
});

app.post('/login', (req, res) => {
	const { Login } = req.body;
	const EnteredPassword = req.body.Password;

	if (!Login || Login.length < 3)
	{
		return res.status(500).json({
			message: "Login jest zbyt krótki!"
		 });
	}
	else if (!EnteredPassword || EnteredPassword.length < 6)
	{
		return res.status(500).json({
			message: "Hasło jest zbyt krótkie!"
		 });
	}

	connectDb();

	let query = `SELECT * FROM User
    			WHERE Login = ?;`;

	db.all(query, [Login], (err, users) =>
	{
		if (err)
		{ 
			console.error(err.message);
			res.status(500).send({
				message: "Unauthorised: Użytkownik nie istnieje!"
			});
		}

		if (users.length === 0)
		{
			return res.status(401).send({
				message: "Unauthorised: Użytkownik nie istnieje!"
			});
		}

		const dbUser = users[0];

		if (dbUser.Login === Login)
		{
			const isPasswordValid = bcrypt.compareSync(EnteredPassword, dbUser.Password);
			if (isPasswordValid)
			{
				console.log("Zalogowano!");

				const JWTToken = jwt.sign({
						Login: Login,
						_id: dbUser.IdUser
					},
					'secret',
					{
							expiresIn: '1h'
					});
					return res.status(200).json({
						Login: Login,
						IdUser: dbUser.IdUser,
						message: 'Zalogowano!',
						Token: JWTToken
					});
			}
			else
			{
				console.log("Niepoprawne hasło!");
				res.status(401).send({message: "Niepoprawne hasło!"});
			}
		}
		else
		{
			console.log("Unauthorised: Użytkownik nie istnieje!");
			res.status(401).send({message: "Unauthorised: Użytkownik nie istnieje!"});
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
			//throw err;
			res.status(500).send({
				message: err.message
			});
		}
		rows.forEach(row =>
		{
			books.push({
				Title: row.Title,
				IdBook: row.IdBook,
				Path: row.Path,
				Thumbnail: row.Thumbnail,
				Genre_IdGenre: row.Genre_IdGenre
			})
		});
		res.send(books);
		// books = rows;
	});
	db.close();

	// res.send(books);
});

app.get('/book/download/:IdBook', (req, res) =>
{
	// const { IdBook, IdUser, Token } = req.body;
	const { IdBook } = req.params;

	connectDb();
	let books = [];
	let query = `SELECT * FROM Ebook
              WHERE IdBook = ?;`;

	db.get(query, [IdBook], (err, row) => //IdUser, 
	{
		if (err)
		{
			return console.error(err.message);
		}

		if (row)
		{
			const docJSON = JSON.parse(row.File);
			const path = docJSON.path;
			console.log(path);
			var data =fs.readFileSync(path);
			res.contentType("application/pdf");
			res.send(data);
		}
		else
		{
			res.status(500).send({ status: "Plik jest niedostępny bądź nie istnieje" })
		}
	});

	db.close();
});

// app.post('/book/add', (req, res) =>
// {
// 	console.log(req.body);
// 	connectDb();
// 	const { Title, Language, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre } = req.body;
// 	let { Pages, IsColorful } = req.body;
// 	const bookFile = req.body.File;

// 	validateString("Title",Title, res);
// 	validateString("Language",Language, res);
// 	validateString("Path",Path, res);
// 	validateString("Description",Description, res);
// 	IsColorful = (IsColorful) ? 1 : 0;
// 	Pages = !isNaN(Pages) && Pages >= 0 ? Number.parseInt(Pages) : 0;
// console.log(Pages);

// 	let query = `INSERT INTO Ebook(Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre, File)
// 		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

// 	db.run(query, [Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre, bookFile], function (err)
// 	{
// 		if (err)
// 		{
// 			db.close();
// 			res.status(500).send({ status: err.message });
// 			return console.log(err.message);
// 		}
// 		res.status(200).send({status: "Dodano pomyślnie"});
// 	});

// 	db.close();
// });

app.post('/book/add', upload.single('File'), (req, res, next) =>
{
	console.log(req.body);
	connectDb();
	const { Title, Language, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre } = req.body;
	let { Pages, IsColorful } = req.body;
	const bookFile = JSON.stringify(req.file);
	console.log(bookFile);
	validateString("Title",Title, res);
	validateString("Language",Language, res);
	validateString("Path",Path, res);
	validateString("Description",Description, res);
	IsColorful = (IsColorful) ? 1 : 0;
	Pages = !isNaN(Pages) && Pages >= 0 ? Number.parseInt(Pages) : 0;

	let query = `INSERT INTO Ebook(Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre, File)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

	db.run(query, [Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre, bookFile], function (err)
	{
		if (err)
		{
			res.status(500).send({ status: err.message });
			return console.log(err.message);
		}
		res.status(200).send({status: "Dodano pomyślnie"});
	});

	db.close();
});

app.post('/book/update/:id', upload.single('File'), (req, res, next) =>
{
	console.log(req.body);
	connectDb();
	const { id } = req.params;
	const { Title, Language, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre } = req.body;
	let { Pages, IsColorful } = req.body;
	const bookFile = JSON.stringify(req.file);
	console.log(bookFile);
	validateString("Title",Title, res);
	validateString("Language",Language, res);
	validateString("Path",Path, res);
	validateString("Description",Description, res);
	IsColorful = (IsColorful) ? 1 : 0;
	Pages = !isNaN(Pages) && Pages >= 0 ? Number.parseInt(Pages) : 0;

	let query = `
		UPDATE Ebook
		SET Title = ?,
			Language = ?,
			Pages = ?, 
			IsColorful = ?, 
			Author_IdAuthor = ?, 
			Path = ?, 
			Description = ?, 
			Thumbnail = ?, 
			Genre_IdGenre = ?, 
			File = ?
		WHERE IdBook = ?;
	`;

	db.run(query, [Title, Language, Pages, IsColorful, Author_IdAuthor, Path, Description, Thumbnail, Genre_IdGenre, bookFile, id], function (err)
	{
		if (err)
		{
			res.status(500).send({ status: err.message });
			return console.log(err.message);
		}
		res.status(200).send({status: "Edytowano pomyślnie"});
	});

	db.close();
});


app.post('/user/:IdUser/book/:IdBook', (req, res) =>
{
	const { IdBook, IdUser } = req.params;

	connectDb();
	let HireDate = new Date();
	let ExpireDate = HireDate.addDays(2);
	HireDate = printDate(HireDate);
	ExpireDate = printDate(ExpireDate);
	console.log(HireDate);
	console.log(ExpireDate);

	let query = `INSERT INTO Hire(User_IdUser, Ebook_IdBook, HireDate, ExpireDate)
		VALUES (?, ?, ?, ?);`;

	db.run(query, [IdBook, IdUser, HireDate, ExpireDate], function (err)
	{
		if (err)
		{
			res.status(500).send({ status: err.message });
			return console.log(err.message);
		}
		res.status(200).send({status: "Dodano pomyślnie"});
	});

	db.close();
});

//hire book
app.get('/user/:IdUser/book/:IdBook', (req, res) =>
{
	const { IdBook, IdUser } = req.params;

	connectDb();

	let query = `SELECT * FROM Hire
    	WHERE User_IdUser = ? AND Ebook_IdBook = ?;`;

	db.get(query, [IdUser, IdBook], (err, row) =>
	{	console.log("hires:" + row);
		if (err)
		{
			return console.error(err.message);
		}

		if (row) {
			row.Hired = true;
		}

		return row
			? res.send(row) : res.status(401).send({ Hired: false });
	});

	db.close();
});


//remove hire
app.delete('/user/:IdUser/book/:IdBook', (req, res) =>
{
	const { IdBook, IdUser } = req.params;

	connectDb();

	if (!IdBook || !IdUser)
		return res.status(500).send({status: "Nie istnieje!"});

	let query = `DELETE FROM Hire
		WHERE User_IdUser = ? AND Ebook_IdBook = ?;`;

	db.run(query, [IdBook, IdUser], (err) =>
	{
		if (err)
		{
			res.status(500).send({status: err.message, Hired: 0});
			return console.error(err.message);
		}

		res.status(200).send({
			status: "Deleted",
			Hired: 0
		});
	});

	db.close();
});

app.get('/genres', (req, res) =>
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

app.get('/authors', (req, res) =>
{
	connectDb();
	let query = `SELECT * FROM Author;`;

	db.all(query, [], (err, author) =>
	{
		if (err)
		{
			throw err;
		}

		res.send(author);
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

app.post('/author/add', (req, res) =>
{
	connectDb();
	const { Firstname, Surname, Origin } = req.body;
	console.log(req.body);

	validateString("Firstname", Firstname, res);
	validateString("Surname", Surname, res);
	validateString("Origin", Origin, res);

	let query = `INSERT INTO Author(Firstname, Surname, Origin)
		VALUES (?, ?, ?);`;

	db.run(query, [Firstname, Surname, Origin], function (err)
	{
		if (err)
		{
			res.status(500).send({ message: err.message });
			return console.log(err.message);
		}
		res.status(200).send({status: "Dodano pomyślnie"});
	});

	db.close();
});

app.post('/author/update/:id', (req, res) =>
{
	console.log(req.body);
	connectDb();
	const { id } = req.params;
	const { Firstname, Surname, Origin } = req.body;
	validateString("Firstname",Firstname, res);
	validateString("Surname",Surname, res);
	validateString("Origin",Origin, res);

	let query = `
		UPDATE Author
		SET Firstname = ?,
			Surname = ?,
			Origin = ?
		WHERE IdAuthor = ?;
	`;

	db.run(query, [Firstname, Surname, Origin, id], function (err)
	{
		if (err)
		{
			res.status(500).send({ status: err.message });
			return console.log(err.message);
		}
		res.status(200).send({status: "Edytowano pomyślnie"});
	});

	db.close();
});

app.delete('/author/delete/:id', (req, res) =>
{
	connectDb();
	
	const { id } = req.params;
	console.log(id);
	console.log(req.params);
	if (!id)
		return res.status(500).send({status: "Nie istnieje!"});

	let query = `DELETE FROM Author
    	WHERE IdAuthor = ?;`;

	db.run(query, [id], (err) =>
	{
		if (err)
		{
			res.status(500).send({status: err.message});
			return console.error(err.message);
		}

		res.status(200).send({status: "Deleted"});
	});

	db.close();
});

app.delete('/book/delete/:id', (req, res) =>
{
	connectDb();
	
	const { id } = req.params;
	console.log(id);
	console.log(req.params);
	if (!id)
		return res.status(500).send({status: "Nie istnieje!"});

		//-------------
	let queryDelete = `DELETE FROM Hire
		WHERE Ebook_IdBook = ?;`;

	db.run(queryDelete, [id], (err) =>
	{
		if (err)
		{
			console.error(err.message);
		}

		// res.status(200).send({
		// 	status: "Deleted",
		// 	Hired: 0
		// });
	});
		//-------------

	let query = `DELETE FROM Ebook
    	WHERE IdBook = ?;`;

	db.run(query, [id], (err) =>
	{
		if (err)
		{
			res.status(500).send({status: err.message});
			return console.error(err.message);
		}

		res.status(200).send({status: "Deleted"});
	});

	db.close();
});


app.get('/genre/:id', (req, res) =>
{
	connectDb();
	const { id } = req.params;

	let query = `SELECT * FROM Genre
    	WHERE IdGenre = ?;`;

	db.all(query, [id], (err, genres) =>
	{
		if (err)
		{
			return console.error(err.message);
		}

		res.send(genres[0]);
	});

	db.close();
});

app.post('/genre/add', (req, res) =>
{
	connectDb();
	const { Name } = req.body;
	console.log(req.body);
	console.log(Name);
	if (!Name || Name.length < 2)
	{
		return res.status(500).send({ message: "Nazwa jest za krótka!" });
	}

	let query = `INSERT INTO Genre(Name)
		VALUES (?);`;

	db.run(query, [Name], function (err)
	{
		if (err)
		{
			res.status(500).send({ message: err.message });
			return console.log(err.message);
		}
		res.status(200).send({status: "Dodano pomyślnie"});
	});

	db.close();
});

app.delete('/genre/delete/:id', (req, res) =>
{
	connectDb();
	
	const { id } = req.params;
	console.log(id);
	console.log(req.params);
	if (!id)
		return res.status(500).send({status: "Nie istnieje!"});

	let query = `DELETE FROM Genre
    	WHERE IdGenre = ?;`;

	db.run(query, [id], (err) =>
	{
		if (err)
		{
			res.status(500).send({status: err.message});
			return console.error(err.message);
		}

		res.status(200).send({status: "Deleted"});
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

function validateString(attrName, attr, res) 
{
	if (!attr || attr.length < 2)
	{
		res.status(500).send({ message: `${attrName} niepoprawny!` });
		return console.error(`${attrName} niepoprawny!`);
	}
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
	return date;
}

function printDate(date) {
	var dd = date.getDate();

	var mm = date.getMonth()+1; 
	var yyyy = date.getFullYear();
	if(dd<10) 
	{
		dd='0'+dd;
	} 

	if(mm<10) 
	{
		mm='0'+mm;
	} 

	return date = dd+'-'+mm+'-'+yyyy;
}

app.listen(port, () => console.log(`Listening on port ${port}`));