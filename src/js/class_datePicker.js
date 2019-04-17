import CreateCalendar from './class_calendarMake';

/* eslint-disable no-mixed-operators */
export default class DatePicker {
  constructor() {
    this.toThere = document.querySelector('[data-input=toThere]');
    this.toBack = document.querySelector('[data-input=toBack]');
    this.checkbox = document.querySelector('#checkbox');
    this.calendar = document.querySelector('#calendar');
    this.holder = document.querySelector('#holder');

    this.toThereChecked = 0;
    this.control = 0;
    this.btn = 'no';

    this.dateNow = new Date();
    this.year = this.dateNow.getFullYear();
    this.month = this.dateNow.getMonth() + 1;
  }

  create() {
    this.addListenerCheckbox();
    this.addListenerCalendar();
    this.addListenersFocus();
    this.addListenersButtons();
    this.addListentersCancelBubble();
    this.addListenerHideCalendar();
  }

  addListenerCheckbox() {
    this.checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        document.getElementsByClassName('back')[0].style.display = 'block';
      } else {
        document.getElementsByClassName('back')[0].style.display = 'none';
      }
    });
  }

  addListenerCalendar() {
    this.calendar.addEventListener('click', (event) => {
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
        const dataArr = new CreateCalendar().splitString(String(date.textContent));

        if (this.btn === 'there') {
          this.toThereChecked = Number(event.toElement.textContent);
          this.toThere.value = `${this.toThereChecked}.${dataArr[0]}.${dataArr[1]}`;
        } else {
          this.toBack.value = `${event.toElement.textContent}.${dataArr[0]}.${dataArr[1]}`;
        }
      }
    });
  }

  addListenersFocus() {
    this.toThere.addEventListener('focus', () => {
      if (this.holder.style.top !== '-100%') {
        new CreateCalendar().createCalendarPage(this.year, this.month);
      }

      this.holder.style.top = `${this.toThere.offsetTop + this.toThere.offsetHeight}px`;
      this.holder.style.left = `${this.toThere.offsetLeft - ((this.holder.clientWidth - this.toThere.offsetWidth) / 2)}px`;

      this.btn = 'there';
    });

    this.toBack.addEventListener('focus', () => {
      const date = document.querySelector('#date');
      const dataArr = new CreateCalendar().splitString(String(date.textContent));

      if (this.holder.style.top !== '-100%') {
        this.toThereChecked = [Number(this.toThereChecked), dataArr[0] - 1, dataArr[1], 'back'];
        // передаём выбранную дату
        new CreateCalendar().createCalendarPage(dataArr[1], dataArr[0], this.toThereChecked);
      }

      this.holder.style.top = `${this.toBack.offsetTop + this.toBack.offsetHeight}px`;
      this.holder.style.left = `${this.toBack.offsetLeft - ((this.holder.clientWidth - this.toBack.offsetWidth) / 2)}px`;
      this.btn = 'back';
    });
  }

  addListenersButtons() {
    // переключатель минус месяц
    document.querySelector('#back').addEventListener('click', () => {
      if (this.month > 1) {
        this.month -= 1;
      } else {
        this.month = 12;
        this.year -= 1;
      }
      if (this.toThere.value !== '' && this.control === 0) {
        const date = document.querySelector('#date');
        const dataArr = new CreateCalendar().splitString(String(date.textContent));

        this.control = [Number(this.toThereChecked), dataArr[0] - 1, dataArr[1], this.btn];
        // передаём выбранную дату
        new CreateCalendar().createCalendarPage(this.year, this.month, this.control);
      } else if (this.toThere.value !== '' && this.control !== 0) {
        // передаём выбранную дату
        new CreateCalendar().createCalendarPage(this.year, this.month, this.control);
      } else {
        new CreateCalendar().createCalendarPage(this.year, this.month, 'button');
      }
    });

    // переключатель плюс месяц
    document.querySelector('#next').addEventListener('click', () => {
      if (this.month < 12) {
        this.month += 1;
      } else {
        this.month = 1;
        this.year += 1;
      }

      if (toThere.value !== '' && this.control === 0) {
        const date = document.querySelector('#date');
        const dataArr = new CreateCalendar().splitString(String(date.textContent));

        this.control = [Number(this.toThereChecked), dataArr[0] - 1, dataArr[1], this.btn];
        // передаём выбранную дату
        new CreateCalendar().createCalendarPage(this.year, this.month, this.control);
      } else if (this.toThere.value !== '' && this.control !== 0) {
        // передаём выбранную дату
        new CreateCalendar().createCalendarPage(this.year, this.month, this.control);
      } else {
        new CreateCalendar().createCalendarPage(this.year, this.month, 'button');
      }
    });
  }

  addListentersCancelBubble() {
    const form = document.querySelector('[data-form=form]');
    // убираем всплытие для формы
    form.addEventListener('click', (event) => {
      // eslint-disable-next-line no-param-reassign
      event = event || window.event; // кросс-браузерно
      if (event.stopPropagation) {
      // Вариант стандарта W3C:
        event.stopPropagation();
      } else {
      // Вариант Internet Explorer:
      // eslint-disable-next-line no-param-reassign
        event.cancelBubble = true;
      }
    });

    // убираем всплытие для календаря
    this.holder.addEventListener('click', (event) => {
      // eslint-disable-next-line no-param-reassign
      event = event || window.event; // кросс-браузерно
      if (event.stopPropagation) {
      // Вариант стандарта W3C:
        event.stopPropagation();
      } else {
      // Вариант Internet Explorer:
      // eslint-disable-next-line no-param-reassign
        event.cancelBubble = true;
      }
    });
  }

  addListenerHideCalendar() {
    this.main = document.querySelector('[data-id=main]');
    // скрыываем календарь
    this.main.addEventListener('click', () => {
      this.holder.style.top = `${-100}%`;
      this.holder.style.left = `${-100}%`;
    });
  }
}
