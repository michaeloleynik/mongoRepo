const {Router} = require('express'); // Подключаем экспресс
const Course = require('../models/course'); // Подключаем модуль курсов
const router = Router(); // Создаем роут

router.get('/', async (req, res) => { // По запросу гет мы вызываем метод гетОл класса Курсы
  const courses = await Course.getAll();
  res.render('courses', { // Рендерим страницу курсов, а также значения полученные строкой выше
    title: 'Курсы',
    isCourses: true,
    courses
  });
});

router.get('/:id/edit', async (req, res) => { // По запросу гет и флагом изменить проверяем есть флаг edit.allow
  if (!req.query.allow) { // Если не существует, то просто перенаправляем на главную страницу
    return res.redirect('/');
  }

  const course = await Course.getById(req.params.id); // Иначе получаем id того товара который хотим редактировать 

  res.render('course-edit', {
    title: `Редактировать ${course.title}`, // Рендерим страницу изменения определнного товара с title определенного товара
    course // Генерируем значения полученные в запросе await Course.getById
  });
});

router.post('/edit', async (req, res) => { // По ссылке edit перенаправляем на страницу с редактированием курсов
  await Course.update(req.body);
  res.redirect('/courses');
});

router.get('/:id', async (req, res) => { // По индивидуальному id рендерим страницу товара
  const course = await Course.getById(req.params.id);
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course
  });
});

module.exports = router;