const express = require('express'); // подключаем експресс
const path = require('path'); // подключаем пас
const mongoose = require('mongoose');
const exphbs = require('express-handlebars'); // подключаем хендл-барс
const homeRoutes = require('./routes/home'); // подключаем роут отвечающий за главную страницу
const cardRoutes = require('./routes/card'); // подключаем роут отвечающий за корзину
const addRoutes = require('./routes/add'); // подключаем роут отвечающий за добавление товаров
const coursesRoutes = require('./routes/courses'); // подключаем роут отвечающий за каталог

const app = express(); // передаем объект експресс

const hbs = exphbs.create({ // создаем лейаут хендл-барса
  defaultLayout: 'main', // Дефолтный шаблон 
  extname: 'hbs' // Расширение
});

app.engine('hbs', hbs.engine); // генерируем хендл-барс
app.set('view engine', 'hbs'); // объясняем что используем движок хендл-барс
app.set('views', 'views'); // Устанавливаем путь где будут лежать все шаблоны

app.use(express.static(path.join(__dirname, 'public'))); // Делает файлы статичными, т.е. их будет видно на клиентской части
app.use(express.urlencoded({extended: true})); 

app.use('/', homeRoutes); // Передаётся конец ссылки, в данном случае это главная страница, вторым параметром мы передаём роут, который будет отвечать за рендер данной страницы
app.use('/add', addRoutes); // Передаётся конец ссылки, в данном случае это страница с добавлением товаров, вторым параметром мы передаём роут, который будет отвечать за рендер данной страницы
app.use('/courses', coursesRoutes); // Передаётся конец ссылки, в данном случае это страница каталога, вторым параметром мы передаём роут, который будет отвечать за рендер данной страницы
app.use('/card', cardRoutes); // Передаётся конец ссылки, в данном случае это страница корзины, вторым параметром мы передаём роут, который будет отвечать за рендер данной страницы

const PORT = process.env.PORT || 2000; // Если порт не указан, то используем 2000

async function start() {
  const url = 'mongodb+srv://michael:p38q9IZVPTD6QIWN@cluster0.mv5xs.mongodb.net/Cluster0?retryWrites=true&w=majority';

  await mongoose.connect(url, {useNewUrlParser: true});

  app.listen(PORT, () => { // Разворачиваем сервер
  console.log(`Server is running on port ${PORT}`);
});
}

start();

//p38q9IZVPTD6QIWN
//mongodb+srv://michael:p38q9IZVPTD6QIWN@cluster0.mv5xs.mongodb.net/Cluster0?retryWrites=true&w=majority