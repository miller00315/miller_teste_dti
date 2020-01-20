export const numberToReal = value => {
  if(value !== '') {
    let number = value.toFixed(2).split('.');
    number[0] = "R$" + number[0].split(/(?=(?:...)*$)/).join('.');
    return number.join(',');
  }
  return value;
};