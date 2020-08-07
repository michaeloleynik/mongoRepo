const {Router} = require('express'); // Подключаем експресс
const Card = require('../models/card'); // Подключаем модуль корзины, в котором происходит вся логика генерации корзины и товаров
const Course = require('../models/course'); // Подключаем модуль курсов, в которой генериируется карточка товара
const router = Router(); // Подключаем роут

router.post('/add', async (req, res) => { // По запросу пост на странице добавления товаров мы получем 
  const course = await Course.getById(req.body.id);
  await Card.add(course);
  res.redirect('/card'); // Перенаправляем пользователя в корзину
});

router.delete('/remove/:id', async (req, res) => { // По запросу дэлит мы удаляем определенный товар с уникальным id
  const card = await Card.remove(req.params.id);
  res.status(200).json(card); // Получаем снова карзину уже с обновлёнными значениями, json метод нужен чтобы из json преобразовать в нормальный вид
});

router.get('/', async (req, res) => { // По запросу гет получаем список товаров в корзине при помощи метода fetch, описанного в классе Кард
  const card = await Card.fetch();
  res.render('card', { // Рендерим страницу корзины, а также значения названий товаров и их цен
    title: 'Корзина',
    isCard: true,
    courses: card.courses,
    price: card.price
  });
});

module.exports = router; // Экспортируем роут