import { Sequelize } from "sequelize";
const config =  require('./db-config.json');

const db = new Sequelize(config.database, config.username,config.password,{
    host: config.host,
    dialect: config.dialect,
    port: 3306,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});
export default db;