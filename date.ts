import * as moment from 'moment';

/**
 * 今週の月曜の日付を取得する
 * @param nowDate
 */
export const getThisMonday = (nowDate: moment.Moment) => {
  let day = nowDate.get('day') - 1;
  if (day === -1) day = 6;
  return subtractDays(nowDate, day);
}

/**
 * 1週間前の月曜日を取得する(ロジック的には月曜日固定ではないけど、lambdaが月曜日に実行されるからよしとする)
 * @param nowDate
 */
export const getLastWeekMonday = (nowDate: moment.Moment) => {
  return subtractDays(nowDate, 7);
}

const subtractDays = (date: moment.Moment, day: number) => {
  date.subtract(day, 'day');
  return resetTime(date);
}

const resetTime = (date: moment.Moment) => {
  date.set('hour', 0);
  date.set('minute', 0);
  date.set('second', 0);
  date.set('millisecond', 0);
  return date;
}
