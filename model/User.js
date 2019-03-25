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

// const User = sequelize.define('User', {
//     Firstname: {
//         type: Sequelize.STRING
//     },
//     Surname: {
//         type: Sequelize.STRING
//     },
//     Login: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     Password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     Email: {
//         type: Sequelize.STRING
//     },
//     Salt: {
//         type: Sequelize.STRING
//     }
// });

// // create all the defined tables in the specified database.
// sequelize.sync()
//     .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occured', error));

// // export User model for use in other files.
// module.exports = User;