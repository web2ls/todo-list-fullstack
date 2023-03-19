const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./queries');
const cors = require('cors');

const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(db.inter);

app.get('/', (req, res) => {
  res.send('Todos server is ready');
});

app.get('/todos', db.getTodos);
app.get('/todos/:id', db.getTodoById);
app.post('/todos/', db.createTodo);
app.put('/todos/:id', db.updateTodo);
app.put('/todos/complete/:id', db.completeTodo);
app.delete('/todos/:id', db.deleteTodo);
app.post('/login', db.login);
app.get('/logout', db.logout);

app.listen(PORT, () => {
  console.log('Server has been started...');
})