const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const RECORDS_PER_PAGE = 3;

const getTodos = (request, response) => {
  const { sortby, page, direction } = request.query;
  const q = [
    `SELECT * FROM todos ORDER BY ${sortby} ${direction} LIMIT 3 OFFSET ${Number(page) * RECORDS_PER_PAGE}`,
    'SELECT COUNT(*) FROM todos'
  ];

  pool.query(q.join(';'), (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      const todos = results[0].rows;
      const count = results[1].rows[0].count;
      response.status(200).json({ todos, count })
    }
  })
}

const getTodoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const interceptor = (request, response, next) => {
  if (request.method === 'GET' || request.path === '/login') {
    next();
    return;
  }

  pool.query('SELECT logged FROM users WHERE username = $1', ['admin'], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      const res = results.rows[0];
      if (res && res.logged) {
        next();
      } else {
        response.status(403).send('Forbidden route');
      }
    }
  })
};

const createTodo = (request, response) => {
  const { name, email, text, complete } = request.body

  pool.query('INSERT INTO todos (name, email, text, complete) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, text, complete], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(201).send(`Todo added with ID: ${results.rows[0].id}`)
    }
  })
}

const updateTodo = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, text } = request.body;

  pool.query(
    'UPDATE todos SET name = $1, email = $2, text = $3 WHERE id = $4',
    [name, email, text, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).send(`Todo modified with ID: ${id}`)
      }
    }
  )
}

const completeTodo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    'UPDATE todos SET complete = $1',
    [true],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(200).send(`Todo has been completed`)
      }
    }
  )
}

const deleteTodo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(`Todo deleted with ID: ${id}`)
    }
  })
}

const setUserLoggedIn = async (value) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE users SET logged = $1',
      [value],
      (error, results) => {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    )
  })
};

const login = (request, response) => {
  const { username, password } = request.body;

  pool.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password],
    async (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        if (results.rows && results.rows.length) {
          try {
            await setUserLoggedIn(true);
            response.status(200).send('Logged in');
          } catch (err) {
            response.status(500).send(err);
          }
        } else {
          response.status(404).send('User not found');
        }
      }
    }
  )
}

const logout = (request, response) => {
  try {
    setUserLoggedIn(false);
    response.status(200).send('Logged out');
  } catch (err) {
    response.status(500).send(err);
  }
}

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
  login,
  logout,
  interceptor,
}