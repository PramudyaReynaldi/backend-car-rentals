// import { Sequelize } from "sequelize";

// const db = new Sequelize("auth_db", "root", "", {
//     host: "localhost",
//     dialect: "mysql"
// });

// export default db;

import { Sequelize } from "sequelize";
import config from "../config/config.json" assert { type: "json" };

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const db = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    }
);

export default db;
