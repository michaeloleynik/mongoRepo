const {Router} = require('express'); // Подключаем экспресс
const router = Router(); // Подключаем роут

router.get('/', (req, res) => { // По запросу гет рендерим страницу index.hbs, title которой "Главная страница" 
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  });
});


module.exports = router; // Экспортируем роут и всё что с ним связано