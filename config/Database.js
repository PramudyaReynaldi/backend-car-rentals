import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DBNAME
} = process.env;

const db = new Sequelize(DB_DBNAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    port: 3306
});

export default db;