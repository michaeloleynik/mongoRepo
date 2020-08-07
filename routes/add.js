const {Router} = require('express'); // Подключаем экспресс
const Course = require('../models/course'); //Подключаем модуль курсов, в которой генериируется карточка товара
const router = Router(); // Подключаем роут

router.get('/', (req, res) => { // По запросу гет рендерим страницу add.hbs, title которой "Добавить курс"
  res.render('add', {
    title: 'Добавить курс',
    isAdd: true
  });
});

router.post('/', async (req, res) => { // По запросу пост получаем значения названия, цены и ссылки картинки из класса Курс 
  const course = new Course(req.body.title, req.body.price, req.body.img); 

  await course.save(); // Сохраняем данные значения в json-файл courses.json - логика описана в моделе course.js

  res.redirect('/courses'); // Перенаправляем пользователя на страницу с курсами
});

module.exports = router; // Экспротируем роут и всё, что с ним связано