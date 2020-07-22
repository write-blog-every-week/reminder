import * as moment from 'moment';

export const getThisMonday = (nowDate: moment.Moment) => {
  let day = nowDate.get('day') - 1;
  if (day === -1) day = 6;
  nowDate.subtract(day, 'day');
  nowDate.set('hour', 0);
  nowDate.set('minute', 0);
  nowDate.set('second', 0);
  nowDate.set('millisecond', 0);
  return nowDate;
}
