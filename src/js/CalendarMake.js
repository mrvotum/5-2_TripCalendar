/* eslint-disable no-mixed-operators */
import Differents from './Differents';

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

  splitStringPoint(stringToSplit) {
    const arrayOfStrings = stringToSplit.split('.');
    arrayOfStrings[0] = Number(arrayOfStrings[0]);
    arrayOfStrings[1] = Number(arrayOfStrings[1] - 1);
    arrayOfStrings[2] = Number(arrayOfStrings[2]);
    return arrayOfStrings;
  }

  createCalendarPage(year, month, btn, back) {
    const elem = document.querySelector('[data-id=calendar]');
    const date = document.querySelector('[data-id=date]');

    const mon = month - 1; // месяцы от 0 до 11
    const d = new Date(year, mon);

    this.table = `<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th>
    <th>пт</th><th>сб</th><th>вс</th></tr><tr>`;

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (let i = 0; i < this.getDay(d); i += 1) {
      this.table += '<td></td>';
    }

    // ячейки календаря с датами
    if (back === 'back') {
      this.createBack('back', mon, d);
    } else {
      this.createThere(btn, mon, d);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (this.getDay(d) !== 0) {
      for (let i = this.getDay(d); i < 7; i += 1) {
        this.table += '<td></td>';
      }
    }

    // закрыть таблицу
    this.table += '</tr></table>';

    // только одно присваивание innerHTML
    elem.innerHTML = this.table;

    // записываем текущую дату в шапку
    date.innerHTML = `${this.monthArr[month - 1]} ${year}`;
  }

  createThere(btn, mon, d) {
    try {
      this.checkedDay = document.querySelector('[data-input=toThere]');
      this.checkedDay = this.checkedDay.value.slice(0, -7); // получает выбранное число
    } catch (error) {
      // console.error('нет такого');
    }

    if (this.checkedDay === '') {
      // ячейки календаря с датами
      while (d.getMonth() === mon) {
        if (d.getDate() === this.dateNow.getDate() && !btn) { // сегодня
          this.table += `<td class="today"> ${d.getDate()} </td>`;
        } else if (d.getDate() < this.dateNow.getDate() && !btn || btn === 'button' && d < this.dateNow) { // недоступно
          this.table += `<td class="noActive"> ${d.getDate()} </td>`;
        } else if (d.getDate() > this.dateNow.getDate() && !btn || btn === 'button' && d > this.dateNow) { // когда доступно
          this.table += `<td class="active">  ${d.getDate()} </td>`;
        }
        // btn --- это дата, которую выбрали на календаре для поездки

        if (this.getDay(d) % 7 === 6) { // вс, последний день - перевод строки
          this.table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
      }
    } else {
      // ячейки календаря с датами
      while (d.getMonth() === mon) {
        console.log(this.checkedDay);
        if (d.getDate() === Number(this.checkedDay) && !btn) { // сегодня
          this.table += `<td class="today"> ${d.getDate()} </td>`;
        } else if (d.getDate() < Number(this.checkedDay) && !btn || btn === 'button' && d < this.dateNow) { // недоступно
          this.table += `<td class="noActive"> ${d.getDate()} </td>`;
        } else if (d.getDate() > Number(this.checkedDay) && !btn || btn === 'button' && d > this.dateNow) { // когда доступно
          this.table += `<td class="active">  ${d.getDate()} </td>`;
        }
        // btn --- это дата, которую выбрали на календаре для поездки

        if (this.getDay(d) % 7 === 6) { // вс, последний день - перевод строки
          this.table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
      }
    }
  }

  createBack(btn, mon, d) {
    // ячейки календаря с датами
    while (d.getMonth() === mon) {
      this.thereDate = document.querySelector('[data-input=toThere]');
      // дата поездки туда
      const dArr = new CreateCalendar().splitStringPoint(String(this.thereDate.value));
      const daysArr = [d.getDate(), d.getMonth(), d.getFullYear()]; // открытая страница календаря

      if (new Differents(daysArr, dArr).create() === 0) { // выбранный день
        this.table += `<td class="checkedDayThere"> ${d.getDate()} </td>`;
      } else if (new Differents(daysArr, dArr).create() < 0 && d < this.dateNow) { // недоступно
        this.table += `<td class="noActive"> ${d.getDate()} </td>`;
      } else if (new Differents(daysArr, dArr).create() > 0) { // когда доступно
        this.table += `<td class="active"> ${d.getDate()} </td>`;
      } else {
        this.table += `<td class="noActive"> ${d.getDate()} </td>`;
      }

      if (this.getDay(d) % 7 === 6) { // вс, последний день - перевод строки
        this.table += '</tr><tr>';
      }
      d.setDate(d.getDate() + 1);
    }
  }
}
