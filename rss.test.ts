import { getThisMonday } from "./date";
import * as moment from 'moment';
import { getLatestFeedPubDate } from "./rss";

test('no items field Parser.Output returns this monday', () => {
  const monday = getThisMonday(moment());
  expect(getLatestFeedPubDate({}, 1).isSame(monday)).toBe(true);
});

test('not enough items for requiredCount + 1, returns this monday', () => {
  const monday = getThisMonday(moment());
  const output = {
      items: [{
          pubDate: '2020-07-23T15:00:01.000Z'
      }]
  };
  expect(getLatestFeedPubDate(output, 1).isSame(monday)).toBe(true);
});