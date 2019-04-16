/* eslint-disable no-mixed-operators */
import differents from './differents';

const dateNow = new Date();

const monthArr = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
  let day = date.getDay();
  if (day === 0) day = 7;
  return day - 1;
}

export default function createCalendar(year, month, btn) {
  const elem = document.getElementById('calendar');
  const date = document.getElementById('date');

  const mon = month - 1; // месяцы от 0 до 11
  const d = new Date(year, mon);

  let table = `<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th>
  <th>пт</th><th>сб</th><th>вс</th></tr><tr>`;

  // заполнить первый ряд от понедельника
  // и до дня, с которого начинается месяц
  // * * * | 1  2  3  4
  for (let i = 0; i < getDay(d); i += 1) {
    table += '<td></td>';
  }

  // ячейки календаря с датами
  while (d.getMonth() === mon) {
    const dArr = [d.getDate(), d.getMonth(), d.getFullYear()]; // открытая страница календаря

    if (d.getDate() === dateNow.getDate() && !btn) { // сегодня
      table += `<td class="today"> ${d.getDate()} </td>`;
    } else if (d.getDate() < dateNow.getDate() && !btn || btn === 'button' && d < dateNow) { // недоступно
      table += `<td class="noActive"> ${d.getDate()} </td>`;
    } else if (d.getDate() > dateNow.getDate() && !btn || btn === 'button' && d > dateNow) { // когда доступно
      table += `<td class="active">  ${d.getDate()} </td>`;
    } else if (btn && differents(dArr, btn) === 0) { // выбранный день
      // (отсюда начинается при выборе во втором календаре)
      table += `<td class="checkedDayThere"> ${d.getDate()} </td>`;
    } else if (btn && differents(dArr, btn) < 0 && d < dateNow) { // недоступно
      table += `<td class="noActive"> ${d.getDate()} </td>`;
    } else if (btn && differents(dArr, btn) > 0) { // когда доступно
      table += `<td class="active"> ${d.getDate()} </td>`;
    } else {
      table += `<td class="noActive"> ${d.getDate()} </td>`;
    }
    // btn --- это дата, которую выбрали на календаре для поездки

    if (getDay(d) % 7 === 6) { // вс, последний день - перевод строки
      table += '</tr><tr>';
    }
    // console.log(dArr);
    // console.log(btn);
    d.setDate(d.getDate() + 1);
  }

  // добить таблицу пустыми ячейками, если нужно
  if (getDay(d) !== 0) {
    for (let i = getDay(d); i < 7; i += 1) {
      table += '<td></td>';
    }
  }

  // закрыть таблицу
  table += '</tr></table>';

  // только одно присваивание innerHTML
  elem.innerHTML = table;

  // записываем текущую дату в шапку
  date.innerHTML = `${monthArr[month - 1]} ${year}`;
}
