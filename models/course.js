const {v4: uuid} = require('uuid'); // Подключаем модуль для уникальных id
const fs = require('fs'); // Подключаем модуль с файловой системой
const path = require('path'); // Подключаем пас

class Course { // Создаем класс Курс
  constructor(title, price, img) { // В конструктор будем передавать название, цену и ссылку на картинку как обязательные параметры, которые генерируются пользователем
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid(); // Генерируем уникальный id при помощи библиотеки
  }

  toJSON() { // Метод toJSON генерирует из этих значений объект
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    };
  }

  static getAll() { // Метод поучитьВсе возвращает промис, который из courses.json считывет данные
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content)); // Из json в строку
          }
        }
      );
    });
  }

  static async getById(id) { // Получаем конкретный элемент по id
    const courses = await Course.getAll(); // Получаем все товары
    return courses.find(c => c.id === id); // Ищем только тот, который нам нужен по id
  }

  async save() { // Асинхронный метод сохранить 
    const courses = await Course.getAll(); // Получаем все товары
    courses.push(this.toJSON()); // В этот массив добавляем данные сформированные методом toJSON

    return new Promise((resolve, reject) => { // Возвращаем промис, который запишит всё в courses.json
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async update(course) { // Метод обновить
    const courses = await Course.getAll(); // Получаем все товары

    const idx = courses.findIndex(c => c.id === course.id); // Ищем тот, который нам нужен по id
    courses[idx] = course;

    return new Promise((resolve, reject) => { // Возвращаем промис, который обновит данные в courses.json
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = Course; // Экспортируем класс Курс