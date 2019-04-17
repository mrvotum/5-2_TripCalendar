/* eslint-disable no-mixed-operators */
import Differents from './class_differents';

export default class CreateCalendar {
  constructor() {
    this.dateNow = new Date();
    this.monthArr = [
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
  }

  create() {
    this.addListenerCheckbox();
    this.addListenerCalendar();
    this.addListenersFocus();
    this.addListenersButtons();
    this.addListentersCancelBubble();
    this.addListenerHideCalendar();
  }

  // получить номер дня недели, от 0(пн) до 6(вс)
  getDay(date) {
    this.day = date.getDay();
    if (this.day === 0) this.day = 7;
    return this.day - 1;
  }

  splitString(stringToSplit) {
    const arrayOfStrings = stringToSplit.split(' ');
    arrayOfStrings[0] = this.monthArr.indexOf(arrayOfStrings[0]) + 1;
    arrayOfStrings[1] = Number(arrayOfStrings[1]);
    return arrayOfStrings;
  }

  createCalendarPage(year, month, btn) {
    const elem = document.getElementById('calendar');
    const date = document.getElementById('date');

    const mon = month - 1; // месяцы от 0 до 11
    const d = new Date(year, mon);

    let table = `<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th>
    <th>пт</th><th>сб</th><th>вс</th></tr><tr>`;

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (let i = 0; i < this.getDay(d); i += 1) {
      table += '<td></td>';
    }

    // ячейки календаря с датами
    while (d.getMonth() === mon) {
      const dArr = [d.getDate(), d.getMonth(), d.getFullYear()]; // открытая страница календаря

      if (d.getDate() === this.dateNow.getDate() && !btn) { // сегодня
        table += `<td class="today"> ${d.getDate()} </td>`;
      } else if (d.getDate() < this.dateNow.getDate() && !btn || btn === 'button' && d < this.dateNow) { // недоступно
        table += `<td class="noActive"> ${d.getDate()} </td>`;
      } else if (d.getDate() > this.dateNow.getDate() && !btn || btn === 'button' && d > this.dateNow) { // когда доступно
        table += `<td class="active">  ${d.getDate()} </td>`;
      } else if (btn && new Differents(dArr, btn).create() === 0) { // выбранный день
        // (отсюда начинается при выборе во втором календаре)
        table += `<td class="checkedDayThere"> ${d.getDate()} </td>`;
      } else if (btn && new Differents(dArr, btn).create() < 0 && d < this.dateNow) { // недоступно
        table += `<td class="noActive"> ${d.getDate()} </td>`;
      } else if (btn && new Differents(dArr, btn).create() > 0) { // когда доступно
        table += `<td class="active"> ${d.getDate()} </td>`;
      } else {
        table += `<td class="noActive"> ${d.getDate()} </td>`;
      }
      // btn --- это дата, которую выбрали на календаре для поездки

      if (this.getDay(d) % 7 === 6) { // вс, последний день - перевод строки
        table += '</tr><tr>';
      }
      // console.log(dArr);
      // console.log(btn);
      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (this.getDay(d) !== 0) {
      for (let i = this.getDay(d); i < 7; i += 1) {
        table += '<td></td>';
      }
    }

    // закрыть таблицу
    table += '</tr></table>';

    // только одно присваивание innerHTML
    elem.innerHTML = table;

    // записываем текущую дату в шапку
    date.innerHTML = `${this.monthArr[month - 1]} ${year}`;
  }
}