//app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
// 
//   const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
// 
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'database error' });
//       return;
//     }
// 
//     if (results.length > 0) {
//       // if user pass and username are correct
//       res.json({ success: true, message: 'Login successful!' });
//       console.log('login successful');
// 
//       // this.$router.push("/home"); // DONT put this in the server !!
//     } else {
//       // if not correct
//       console.log('login failed');
//       res.status(401).json({ success: false, message: 'invalid username or password' });
//     }
//   });
// });