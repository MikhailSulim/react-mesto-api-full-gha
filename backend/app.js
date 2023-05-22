// модуль для работы с переменными окружения в process.env
require('dotenv').config();

// npm-пакеты
const express = require('express');
const mongoose = require('mongoose'); // подключение базы данных

// мидлвэры
const cookieParser = require('cookie-parser'); // для парсинга кук
const helmet = require('helmet'); // безопасность
const { errors } = require('celebrate'); // мидлвэр ошибки
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логеры ошибок и запросов
const cors = require('./middlewares/cors'); // кросс-доменный доступ к api
const limiter = require('./middlewares/limiter'); // для ограничения количеества запросов

const app = express(); // создаёт приложение методом express

const routes = require('./routes/index'); // все роутеры

const { PORT, DB_URL } = require('./utils/config');

const errorsHandler = require('./middlewares/errorsHandler'); // подключение для централизованной обработки ошибок

app.use(express.json()); // для взаимодействия с req.body, аналог body-parser
app.use(cookieParser()); // подключаем парсер кук как мидлвэр, для работы req.cookies

mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
}); // с новых версий не обязательно добавлять опции

app.use(cors);

// мидлвэры безопасности
app.use(helmet()); // для автоматической проставки заголовков безопасности
app.use(limiter); // для предотвращения ddos атак, ограничитель запросов

app.use(requestLogger); // подключаем логгер запросов

app.use(routes); // все роуты

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработка ошибок celebrate
/* будет обрабатывать только ошибки, которые сгенерировал celebrate.
Все остальные ошибки он передаст дальше,
где их перехватит централизованный обработчик. */
app.use(errorsHandler); // центр. обработка ошибок

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

/*
Нет необходимости делать populate для полей owner и likes,
чтобы не загружать запрос лишними запросами и данными
*/
