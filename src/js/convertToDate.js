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

export default function splitString(stringToSplit) {
  const arrayOfStrings = stringToSplit.split(' ');
  arrayOfStrings[0] = monthArr.indexOf(arrayOfStrings[0]) + 1;
  arrayOfStrings[1] = Number(arrayOfStrings[1]);
  return arrayOfStrings;
}
