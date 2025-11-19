const express = require('express');

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user1', email: 'user1@example.com' }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.post('/users', (req, res) => {
  const { username, email } = req.body;
  
  const newUser = {
    id: users.length + 1,
    username,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
