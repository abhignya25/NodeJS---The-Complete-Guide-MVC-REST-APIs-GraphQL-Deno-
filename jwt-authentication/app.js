const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/authMiddleware');

const app = express();
const port = 4000;

const users = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!')
});

app.post('/register', async (req, res) => {
    try {
        if (users.some(user => user.username === req.body.username)) {
            const err = new Error('Email Taken!')
            err.status = 400;
            throw err;
        }

        const user = {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 12),
        }

        users.push(user);

        res.status(201).json({
          status: 'success',
          message: 'User Registered!',
          data: {
            username: {
                username: user.username,
            },
          },
        });
      } catch (err) {
        res.status(err.status).json({
            status: 'fail',
            message: err.message,
          });
      }
});

app.post('/login', async (req, res) => {
    try {
        const user = users.find(user => user.username === req.body.username);
        if (!user) {
            const err = new Error('User Not Found!')
            err.status = 400;
            throw err;
        } else if (await bcrypt.compare(req.body.password, user.password)) {
            const tokenPayload = {
              username: user.username,
            };
            const accessToken = jwt.sign(tokenPayload, 'SECRET');
            res.status(201).json({
                status: 'success',
                message: 'User Logged In!',
                data: {
                  accessToken,
                },
              });
        } else {
            const err = new Error('Wrong Password!');
            err.status = 400;
            throw err;
          }
      } catch (err) {
        res.status(err.status).json({
            status: 'fail',
            message: err.message,
          });
      }
});

app.get('/profile', auth, (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Logged In User Information.',
        data: {
          user: {
              username: req.user.username,
          },
        },
      });
});

app.listen(port, () => {
  console.log(`app running on http://127.0.0.1:${port}`)
});

