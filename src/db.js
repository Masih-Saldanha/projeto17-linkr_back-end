import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL
};

if (process.env.MODE === "PROD") {
    databaseConfig.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);

// MODO ALTERNATIVO ABAIXO SE DER RUIM PRA ALGUEM

// const db = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

export default db;