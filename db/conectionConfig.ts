import { Sequelize } from 'sequelize';

const db = new Sequelize('porta_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;