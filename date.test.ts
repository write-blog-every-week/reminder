import * as moment from 'moment';
import { getThisMonday } from "./date";

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