require('dotenv').config(); // для работы с переменными окружения в process.env

const express = require('express');
const cookieParser = require('cookie-parser'); // для парсинга кук

const app = express();
const mongoose = require('mongoose'); // подключение базы данных

const { errors } = require('celebrate'); // мидлвэр ошибки

// безопасность
const helmet = require('helmet');

const limiter = require('./middlewares/limiter');

const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const userRouter = require('./routes/users'); // подключение роутов пользователей
const cardRouter = require('./routes/cards'); // подключение роутов карточек

const auth = require('./middlewares/auth'); // подключение мидлвэр авторизации

const { PORT, DB_URL } = require('./utils/config');

const errorsHandler = require('./middlewares/errorsHandler'); // подключение для централизованной обработки ошибок
const NotFoundError = require('./errors/NotFoundError'); // кастомный класс ошибки

app.use(express.json()); // для взаимодействия с req.body, аналог body-parser
app.use(cookieParser()); // подключаем парсер кук как мидлвэр, для работы req.cookies

mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
}); // с новых версий не обязательно добавлять опции

// мидлвэры безопасности
app.use(helmet()); // для автоматической проставки заголовков безопасности
app.use(limiter); // для предотвращения ddos атак, ограничитель запросов

// роуты
app.use('/', signinRouter);
app.use('/', signupRouter);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не существует'));
});

app.use(errors()); // обработка ошибок celebrate
/* будет обрабатывать только ошибки, которые сгенерировал celebrate.
Все остальные ошибки он передаст дальше,
где их перехватит централизованный обработчик. */
app.use(errorsHandler); // центр. обработка ошибок

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// TODO внести улучшения после ревью
/*
Работа выполнена хорошо, реализована Joi‌ ‌валидация‌ и ‌централизованная‌ ‌обработка‌ ‌ошибок,
ошибки вынесены в отдельные классы. Реализованы регистрация, логин и авторизация.
Отлично, что подключены helmet и limiter!
Можно лучше:
Роуты можно вынести в отдельный файл index.js в папку routes,
так чтобы вся логика маршрутизации была вынесена из файла app.js:
https://disk.yandex.ru/i/7QfVswBHJRLY8A. Затем роуты можно будет подключить в файле app.js одной строкой: app.use(routes);

Нет необходимости делать populate для полей owner и likes,
чтобы не загружать запрос лишними запросами и данными

Так как используется хранение токена в cookies,
то можно будет добавить роут signout, который очищал бы куки
Пример:
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
*/
