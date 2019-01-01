const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: 'db/database.db'
});

const Genre = sequelize.define('Genre', {
    IdGenre: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Name: {
        type: Sequelize.TEXT
    }
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});

// create all the defined tables in the specified database.
// sequelize.sync()
//     .then(() => console.log('Genre table has been successfully created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = Genre;