const User = sequelize.define('user', {
    FirstName: {
        type: Sequelize.STRING
    },
    LastName: {
        type: Sequelize.STRING
    },
    Login: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    }
});