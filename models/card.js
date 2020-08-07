const path = require('path'); // Подключаем пас
const fs = require('fs'); // Подключаем файловую сис-му

const p = path.join( // Передаем зараннее ссылку куда будут записываться добавленные товары 
  path.dirname(process.mainModule.filename),
  'data',
  'card.json'
);

class Card { // Создаем класс Кард
  static async fetch() { // Создаем метод фетч, в который помещаем промис и читаем из файла card.json данные
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content)); // Переделываем из json в строку
        }
      });
    });
  }

  static async add(course) { // Делаем статическим и асинфхронным метод добавить, в который добавляем определенный курс, который хотим добавить
    const card = await Card.fetch(); // Вызываем метод фетч, который был описан выше

    const idx = card.courses.findIndex(c => c.id === course.id); // Фильтруем конкретный товар, с id который мы хотим
    const candidate = card.courses[idx]; 

    if (candidate) { // Если данный товар уже есть в корзине, то мы просто увеличиваем его количество на 1
      candidate.count++;
      card.courses[idx] = candidate; // Заново рендерим корзину 
    } else { // Иначе мы добавляем товар в корзину и присваеваем количество в 1 штуку
      course.count = 1;
      card.courses.push(course);
    }

    card.price +=+ course.price;  // Также заново рендерим общую стоимость
    
    return new Promise((resolve, reject) => { // Возвращаем промис, который уже отправит всё в card.json
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } 

  static async remove(id) { // Создаем метод удалить
    const card = await Card.fetch(); // Также получаем всё из card.json

    const idx = card.courses.findIndex(c => c.id === id); // Фильтруем конкретный товар, с id который мы хотим
    const course = card.courses[idx];

    if (course.count === 1) { // Если количество данного товара = 1, то мы просто удаляем ряд с этим товаром
      card.courses = card.courses.filter(c => c.id !== id); // Просто фильтруем новый массив из которого выкидываем элемент с нашим id
    } else { // Иначе убавляем количество на 1
      card.courses[idx].count--;
    }

    card.price -= +course.price; // Рендерим заново цену с вычитом удаленного товара

    return new Promise((resolve, reject) => { // Создаем промис, который обновит данные в card.json
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }
}

module.exports = Card; // Экспортируем Кард