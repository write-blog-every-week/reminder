import * as moment from 'moment';

/**
 * 今週の月曜の日付を取得する
 * @param nowDate
 */
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

/**
 * 1週間前の月曜日を取得する(ロジック的には月曜日固定ではないけど、lambdaが月曜日に実行されるからよしとする)
 * @param nowDate
 */
export const getLastWeekMonday = (nowDate: moment.Moment) => {
  return nowDate;
}
