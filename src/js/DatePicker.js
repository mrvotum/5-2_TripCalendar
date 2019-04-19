import CreateCalendar from './CalendarMake';

/* eslint-disable no-mixed-operators */
export default class DatePicker {
  constructor() {
    this.toThere = document.querySelector('[data-input=toThere]');
    this.toBack = document.querySelector('[data-input=toBack]');
    this.checkbox = document.querySelector('[data-id=checkbox]');
    this.calendar = document.querySelector('[data-id=calendar]');
    this.holder = document.querySelector('[data-id=holder]');

    this.toThereChecked = 0;
    this.control = 0;
    this.btn = null;

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
          const dayToThere = this.calendar.getElementsByClassName('checkedDayThere');
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

        const date = document.querySelector('[data-id=date]');
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
      this.btn = 'there';

      if (this.holder.style.top !== '-100%') {
        new CreateCalendar().createCalendarPage(this.year, this.month);
      }

      this.holder.style.top = `${this.toThere.offsetTop + this.toThere.offsetHeight}px`;
      this.holder.style.left = `${this.toThere.offsetLeft - ((this.holder.clientWidth - this.toThere.offsetWidth) / 2)}px`;
    });

    this.toBack.addEventListener('focus', () => {
      if (this.toThere.value === '') {
        this.dateNow = new Date();
        this.toThere.value = `${this.dateNow.getDate()}.${this.dateNow.getMonth() + 1}.${this.dateNow.getFullYear()}`;
        this.toThereChecked = [this.dateNow.getDate(), this.dateNow.getMonth(), this.dateNow.getFullYear(), 'back'];
        // eslint-disable-next-line max-len
        new CreateCalendar().createCalendarPage(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1, this.toThereChecked, 'back');
      } else {
        const date = document.querySelector('[data-id=date]');
        const dataArr = new CreateCalendar().splitString(String(date.textContent));

        if (this.holder.style.top !== '-100%') {
          this.btn = 'back';

          this.toThereChecked = [Number(this.toThereChecked), dataArr[0] - 1, dataArr[1], 'back'];
          // передаём выбранную дату
          // eslint-disable-next-line max-len
          new CreateCalendar().createCalendarPage(dataArr[1], dataArr[0], this.toThereChecked, this.btn);
        }
      }
      this.holder.style.top = `${this.toBack.offsetTop + this.toBack.offsetHeight}px`;
      this.holder.style.left = `${this.toBack.offsetLeft - ((this.holder.clientWidth - this.toBack.offsetWidth) / 2)}px`;
    });
  }

  addListenersButtons() {
    // переключатель минус месяц
    document.querySelector('[data-id=back]').addEventListener('click', () => {
      if (this.month > 1) {
        this.month -= 1;
      } else {
        this.month = 12;
        this.year -= 1;
      }

      new CreateCalendar().createCalendarPage(this.year, this.month, 'button', this.btn);
    });

    // переключатель плюс месяц
    document.querySelector('[data-id=next]').addEventListener('click', () => {
      if (this.month < 12) {
        this.month += 1;
      } else {
        this.month = 1;
        this.year += 1;
      }

      new CreateCalendar().createCalendarPage(this.year, this.month, 'button', this.btn);
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
