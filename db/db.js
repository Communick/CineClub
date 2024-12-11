import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // load env variables

// create connection with db infos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// check connection
db.connect((err) => {
  if (err) {
    console.error('error in db :', err);
    process.exit(1); // stop process if error
  } else {
    console.log('connected to database');
  }
});

export default db; // export connection so we can use it in other files
