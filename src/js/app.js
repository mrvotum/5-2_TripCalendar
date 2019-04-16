/* eslint-disable no-mixed-operators */
import createCalendar from './calendarMake';
import splitString from './convertToDate';

const toThere = document.querySelector('[data-input=toThere]');
const toBack = document.querySelector('[data-input=toBack]');
const checkbox = document.querySelector('#checkbox');
const calendar = document.querySelector('#calendar');
const holder = document.querySelector('#holder');

let toThereChecked = 0;
let control = 0;
let btn = 'no';


checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    document.getElementsByClassName('back')[0].style.display = 'block';
  } else {
    document.getElementsByClassName('back')[0].style.display = 'none';
  }
});

calendar.addEventListener('click', (event) => {
  if (event.toElement.tagName === 'TD' && event.toElement.className === 'active' || event.toElement.tagName === 'TD' && event.toElement.className === 'today') {
    try {
      const dayToThere = calendar.getElementsByClassName('checkedDayThere');
      if (dayToThere[0].className === 'today checkedDayThere') {
        dayToThere[0].className = 'today';
      } else {
        dayToThere[0].className = 'active';
      }
    } catch (error) {
      // console.log('ошибочка');
    }

    const checkedDay = event.toElement.className;
    // eslint-disable-next-line no-param-reassign
    event.toElement.className = `${checkedDay} checkedDayThere`;

    const date = document.querySelector('#date');
    const dataArr = splitString(String(date.textContent));

    if (btn === 'there') {
      toThereChecked = event.toElement.textContent;
      // control = toThereChecked;
      toThere.value = `${toThereChecked}.${dataArr[0]}.${dataArr[1]}`;
    } else {
      // toThereChecked = event.toElement.textContent;
      toBack.value = `${event.toElement.textContent}.${dataArr[0]}.${dataArr[1]}`;
    }
  }
});

const dateNow = new Date();
let year = dateNow.getFullYear();
let month = dateNow.getMonth() + 1;

toThere.addEventListener('focus', () => {
  holder.style.top = `${toThere.offsetTop + toThere.offsetHeight}px`;
  holder.style.left = `${toThere.offsetLeft - ((holder.clientWidth - toThere.offsetWidth) / 2)}px`;
  createCalendar(year, month);

  btn = 'there';
});

toBack.addEventListener('focus', () => {
  const date = document.querySelector('#date');
  const dataArr = splitString(String(date.textContent));

  holder.style.top = `${toBack.offsetTop + toBack.offsetHeight}px`;
  holder.style.left = `${toBack.offsetLeft - ((holder.clientWidth - toBack.offsetWidth) / 2)}px`;

  toThereChecked = [Number(toThereChecked), dataArr[0] - 1, dataArr[1], 'back'];
  createCalendar(dataArr[1], dataArr[0], toThereChecked); // передаём выбранную дату

  btn = 'back';
});

// переключатель минус месяц
document.querySelector('#back').onclick = function moveBack() {
  if (month > 1) {
    month -= 1;
  } else {
    month = 12;
    year -= 1;
  }

  if (toThere.value !== '' && control === 0) {
    const date = document.querySelector('#date');
    const dataArr = splitString(String(date.textContent));

    control = [Number(toThereChecked), dataArr[0] - 1, dataArr[1], btn];
    createCalendar(year, month, control); // передаём выбранную дату
  } else if (toThere.value !== '' && control !== 0) {
    createCalendar(year, month, control); // передаём выбранную дату
  } else {
    createCalendar(year, month, 'button');
  }
};

// переключатель плюс месяц
document.querySelector('#next').onclick = function moveNext() {
  if (month < 12) {
    month += 1;
  } else {
    month = 1;
    year += 1;
  }

  if (toThere.value !== '' && control === 0) {
    const date = document.querySelector('#date');
    const dataArr = splitString(String(date.textContent));

    control = [Number(toThereChecked), dataArr[0] - 1, dataArr[1], btn];
    createCalendar(year, month, control); // передаём выбранную дату
  } else if (toThere.value !== '' && control !== 0) {
    createCalendar(year, month, control); // передаём выбранную дату
  } else {
    createCalendar(year, month, 'button');
  }
};

const main = document.querySelector('[data-id=main]');
main.addEventListener('click', (ev) => {
  console.log(ev);
  holder.style.display = 'none';
});
