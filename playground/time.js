const moment = require('moment');

// let date = moment();
// date.add(1, 'year').subtract(8, 'month');
// console.log(date.format('MMM Do, YYYY'));

const timeStemp = moment().valueOf();
console.log(timeStemp);
let date = moment(timeStemp);
console.log(date.format('h:mm a'));
