import { getThisMonday } from "./date";
import * as moment from 'moment';
import { getLatestFeedPubDate } from "./rss";

test('no items field Parser.Output returns this monday', () => {
  const monday = getThisMonday();
  expect(getLatestFeedPubDate({}, 1).isSame(monday)).toBe(true);
});

test('not enough items for requiredCount + 1, returns this monday', () => {
  const monday = getThisMonday();
  const output = {
      items: [{
          pubDate: '2020-07-23T15:00:01.000Z'
      }]
  };
  expect(getLatestFeedPubDate(output, 1).isSame(monday)).toBe(true);
});

test('2 items required, returns pubDate of 3rd item', () => {
  const expected = moment('2020-07-21T15:00:01.000Z');
  const output = {
      items: [{
          pubDate: '2020-07-23T15:00:01.000Z'
      }, {
          pubDate: '2020-07-22T15:00:01.000Z'
      }, {
          pubDate: '2020-07-21T15:00:01.000Z'
      }]
  };
  expect(getLatestFeedPubDate(output, 2).isSame(expected)).toBe(true);
});
