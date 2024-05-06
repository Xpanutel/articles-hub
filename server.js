const express = require('express');
const mysql = require('mysql');

const app = express();

// Подключение к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ваш_пользователь',
  password: 'ваш_пароль',
  database: 'ваша_база_данных'
});

// Проверка подключения к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err);
    return;
  }
  console.log('Подключено к базе данных MySQL');
});

// Пример использования базы данных
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Ошибка запроса к базе данных: ', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(rows);
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});