const toCurrency = price => { // Функция, которая приводит нашу цену в нормальную форму
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price);
};

document.querySelectorAll('.price').forEach(node => { // Для каждого элемента с классом price вызовем эту функцию
  node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector('#card'); // Получем корзину 
if ($card) { // Если корзина существует
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) { // Проверяем при помощи делегирования кликнули мы по кнопке удалить?
      const id = event.target.dataset.id; // Если да то получаем id элемента, который хотим удалить

      fetch('/card/remove/' + id, { // Создаем фетч-запрос по ссылке /card/remove/id
          method: 'delete' // Вызываем метод удалить
        }).then(res => res.json()) // После этого получем промис, из которого мы получаем новые данные, мы их приводим к нормальному виду из json
        .then(card => { // Если корзина не пуста, создаем новый массив html, в который мы помещаем элементы при помощи map
          if (card.courses.length) {
            const html = card.courses.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>
              `;
            }).join(''); // Из массива превращаем в строку
            $card.querySelector('tbody').innerHTML = html; // Обнoвляем данные заменяя html-содержимое на данные которые записаны в строке html
            $card.querySelector('.price').textContent = toCurrency(card.price); // Заново рендерим общую стоимость при помощи функции описанной вначале
          } else {
            $card.innerHTML = '<p>Корзина пуста</p>'; // Если нет никаких товаров в корзине, то выведим:
          }
        });
    }

  });
}




// const toCurrency = price => { // Функция, которая приводит нашу цену в нормальную форму
//   return new Intl.NumberFormat('ru-RU', {
//     currency: 'rub',
//     style: 'currency'
//   }).format(price);
// };

// document.querySelectorAll('.price').forEach(node => { // Для каждого элемента с классом price вызовем эту функцию
//   node.textContent = toCurrency(node.textContent);
// });

// const $card = document.querySelector('#card'); // Получем корзину 
// if ($card) { // Если корзина существует
//   $card.addEventListener('click', event => { // Проверяем при помощи делегирования кликнули мы по кнопке удалить?
//     if (event.target.classList.contains('js-remove')) {
//       const id = event.target.dataset.id;  // Если да то получаем id элемента, который хотим удалить
      
//       fetch('/card/remove/' + id, { // Создаем фетч-запрос по ссылке /card/remove/id
//         method: 'delete' // Вызываем метод удалить
//       }).then(res => res.json()) // После этого получем промис, из которого мы получаем новые данные, мы их приводим к нормальному виду из json
//         .then(card => {  // Если корзина не пуста, создаем новый массив html, в который мы помещаем элементы при помощи map
//           if (card.courses.length) {
//             const html = card.courses.map(c => { 
//               return `
//                 <tr>
//                   <td>${c.title}</td>
//                   <td>${c.count}</td>
//                   <td>
//                     <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
//                   </td>
//                 </tr>
//             `;}).join(''); // Из массива превращаем в строку
            
//             $card.querySelector('tbody').innetHTML = html; // Обнаовляем данные заменяя html-содержимое на данные которые записаны в строке html
//             $card.querySelector('.price').textContent = toCurrency(card.price); // Заново рендерим общую стоимость при помощи функции описанной вначале
            
//           } else { // Если нет никаких товаров в корзине, то выведим:
//             $card.innerHTML = '<p>Корзина пуста</p>';
//           }
//         });
//     }
    
//   });
// } 