const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('database', '', '', {
//   host: 'localhost',
//   dialect: 'sqlite',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },

//   storage: 'db/database.db'
// });


// import {User} from 'model/User';
// const User = require('./model/User');

// const User = sequelize.define('user', {
//   FirstName: {
//       type: Sequelize.STRING
//   },
//   LastName: {
//       type: Sequelize.STRING
//   },
//   Login: {
//       type: Sequelize.STRING
//   },
//   Password: {
//       type: Sequelize.STRING
//   },
//   Email: {
//       type: Sequelize.STRING
//   }
// });

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/database.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//   sequelize
//   .authenticate()
//   .then(() => {
//     console.log('*******Connection has been established successfully.******');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// // force: true will drop the table if it already exists
// User.sync({ force: false }).then(() =>
// {
//     // Table created
//     return User.create({
//         FirstName: 'John',
//         LastName: 'Hancock',
//         Login: 'admin',
//         Password: 'admin',
//         Email: 'mail@gmail.com'
//     });
// });



// // User.destroy({
// //   where: {},
// //   truncate: true
// // })

// User.findAll().then(users => console.log(users));

//   res.send({ express: 'Hello From Express' });
// });

app.get('/books', (req, res) =>
{
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
	// db.close();

	// res.send(books);
});

app.get('/cats', (req, res) =>
{
	let query = `SELECT * FROM Genre;`;

	db.all(query, [], (err, genres) =>
	{
		if (err)
		{
			throw err;
		}

		res.send(genres);
	});
});

app.get('/book/:id', (req, res) =>
{
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
});


app.post('/api/world', (req, res) =>
{
	console.log(req.body);
	res.send(
		`I received your POST request. This is what you sent me: ${req.body.post}`,
	);
});

app.listen(port, () => console.log(`Listening on port ${port}`));