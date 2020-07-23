import * as moment from 'moment';
import { getThisMonday, getLastWeekMonday } from "./date";

test('2020-07-22, Wed returns 2020-07-20, Mon', () => {
  const nowDate = moment('2020-07-22T15:02:03.004+09:00');
  const actual = getThisMonday(nowDate);
  expect(actual.format()).toBe(moment('2020-07-20T00:00:00.000+09:00').format());
});

test('2020-07-26, Sun returns 2020-07-20, Mon', () => {
  const nowDate = moment('2020-07-26T15:02:03.004+09:00');
  const actual = getThisMonday(nowDate);
  expect(actual.format()).toBe(moment('2020-07-20T00:00:00.000+09:00').format());
});

test('use now as default parameter for getThisMonday', () => {
  const nowDate = moment();
  expect(getThisMonday().isSameOrBefore(nowDate)).toBe(true);
});

test('2020-07-20, Mon returns 2020-07-13, Mon', () => {
  const nowDate = moment('2020-07-20T01:02:03.004+09:00');
  const actual = getLastWeekMonday(nowDate);
  expect(actual.format()).toBe(moment('2020-07-13T00:00:00.000+09:00').format());
});

test('use now as default parameter for getLastWeekMonday', () => {
  const nowDate = moment();
  expect(getLastWeekMonday().isBefore(nowDate)).toBe(true);
});
