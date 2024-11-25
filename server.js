import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express(); // create express app, used for accessing the database
const port = 3000;

// using cors to allow request from vue app
app.use(cors());

// parse request as JSON
app.use(express.json());

dotenv.config(); // configure dotenv to store env variables

// connecting to database
const db = mysql.createConnection({
  host: process.env.DB_HOST, // get the host from dotenv file
  user: process.env.DB_USER, // same from dotenv file
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// check the connection to the database
db.connect((err) => {
  if (err) throw err; // return error if any
  console.log('Connected to database');
});

// route to get all movies
app.get('/api/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      res.status(500).send('error from database');
      return;
    }
    res.json(results); // send results in JSON format
  });
});

// route to get all actors
app.get('/api/actors', (req, res) => {
  db.query('SELECT * FROM actors', (err, results) => {
    if (err) {
      res.status(500).send('error from database');
      return;
    }
    res.json(results); // send results in JSON format
    const currentTime = new Date().toISOString(); // useless but get time
    console.log(`access movies @${currentTime}`); // log the time
  });
});

app.get('/api/movies/:id/actors', (req, res) => { // get all actors from a movie id
  const movieId = req.params.id; // get the movie id from the request URL

  const query = `
      SELECT a.id, a.name, a.photo
      FROM actors a
      INNER JOIN movie_actor ma ON a.id = ma.actor_id
      WHERE ma.movie_id = ?;
  `; // query to get actors from a movie id

  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'error in the database' });
      return;
    }
    res.json(results); // send results in JSON format

    const currentTime = new Date().toISOString(); // useless
    console.log(`access actors @${currentTime}`); // log time
  });
});


app.get('/api/movies/:title', (req, res) => { // get id of a movie by its title
  const movieTitle = req.params.title; // get the movie title from the request URL

  const query = `
    SELECT id FROM movies WHERE title = ?;
  `;
  
  db.query(query, [movieTitle], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'error' });
      return;
    }
    if (results.length === 0) { // in case no movie is found
      res.status(404).json({ error: 'movies not found' });
      return;
    }
    res.json({ id: results[0].id }); // return movie id in JSON format
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'database error' });
      return;
    }

    if (results.length > 0) {
      // if user pass and username are correct
      res.json({ success: true, message: 'Login successful!' });
      console.log('login successful');

      // this.$router.push("/home"); // DONT put this in the server !!
    } else {
      // if not correct
      console.log('login failed');
      res.status(401).json({ success: false, message: 'invalid username or password' });
    }
  });
});


// launch the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // log the port
});

