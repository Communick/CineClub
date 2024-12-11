import express from 'express';  
import cors from 'cors';
import registerRoutes from './routes/register.js';
import db from './db/db.js';

const app = express(); // create express app, used for accessing the database
const port = 3000;

// using cors to allow request from vue app
app.use(cors());

// parse request as JSON
app.use(express.json());


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

import bcrypt from 'bcrypt'; // for hashing password

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (results.length > 0) {
      const hashedPassword = results[0].password;

      // check password
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          res.status(500).json({ error: 'Error comparing passwords' });
          return;
        }

        if (isMatch) {
          res.json({
            success: true,
            message: 'Login successful!',
            username: username,
            userID: results[0].id
          });
          console.log('Login successful');
        } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
          console.log('Login failed');
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      console.log('Login failed');
    }
  });
});

// get users informations (username and created account data)
app.post('/api/users', (req, res) => {
  const { username } = req.body;

  const query = 'SELECT id, username, account_created_date FROM users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (results.length > 0) {
      res.json(results[0]); // return the user data
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});


app.get('/api/user/:userId/favorites', (req, res) => {
  const userId = req.params.userId; // get the user id from the request URL
  
  const query = `
    SELECT movies.title, movies.poster, movies.description, movies.longdescription
    FROM movies
    JOIN user_favorites ON movies.id = user_favorites.movie_id
    WHERE user_favorites.user_id = ?
  `; // query to find all the movies a given user has starred
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving starred' });
    }
    res.json(results);
  });
});

app.get('/api/user_favorites', (req, res) => {
  const userId = req.query.userId; // userId should be sent as a query parameter
  if (!userId) {
    res.status(400).send('userId is required');
    return;
  }
  db.query('SELECT count(*) as count FROM user_favorites WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send('Error from database');
      return;
    }
    res.json(results[0]); // send the count as a JSON object
  });
});

app.post('/api/add-favorite', (req, res) => {
  const { user_id, movie_id } = req.body;
  const query = 'INSERT INTO user_favorites (user_id, movie_id) VALUES (?, ?)';
  db.query(query, [user_id, movie_id], (err, result) => {
    if (err) {
      console.error('Error when adding to favorites', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Movie added to favorites');
  });
});


app.post('/api/remove-favorite', (req, res) => {
  const { user_id, movie_id } = req.body;
  const query = 'DELETE FROM user_favorites WHERE user_id = ? AND movie_id = ?';
  db.query(query, [user_id, movie_id], (err, result) => {
    if (err) {
      console.error('error when add to favorites', err);
      return res.status(500).send('server error');
    }
    res.status(200).send('movie deleted from favorites');
  });
});

app.get('/api/get-movie-id', (req, res) => {
  const { title } = req.query; // get URL parameters using req.query
  const query = 'SELECT id FROM movies WHERE title = ?';

  console.log('ACCESS to MOVIE ID, title:', title);

  if (!title) {
    res.status(400).send({ error: 'Le paramètre "title" est requis.' });
    return;
  }

  db.execute(query, [title], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      res.status(500).send({ error: 'Database error' });
      return;
    }

    if (results.length > 0) {
      console.log('Movie id found:', results[0].id);
      res.json({ id: results[0].id });
    } else {
      console.log('Movie not found');
      res.status(404).send({ error: 'Movie not found' });
    }
  });
});

app.get('/api/user-favorites/:userId', (req, res) => {
  const { userId } = req.params; // get URL parameters using req.query
  const query = `
    SELECT uf.movie_id, m.title, m.poster, m.description, m.longdescription
    FROM user_favorites uf
    INNER JOIN movies m ON uf.movie_id = m.id
    WHERE uf.user_id = ?
  `;

  if (!userId) {
    res.status(400).send({ error: 'parameter "userId" is required' });
    return;
  }

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('SQL error', err);
      res.status(500).send({ error: 'db error' });
      return;
    }

    if (results.length > 0) {
      res.json({ movies: results }); // return all the movies in JSON format
    } else {
      res.status(404).send({ error: 'No movies found for this user' });
    }
  });
});



app.use('/api/users', registerRoutes);
app.use('/api', registerRoutes);

// launch the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // log the port
});

