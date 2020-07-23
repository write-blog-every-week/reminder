import { getThisMonday } from "./date";
import * as moment from 'moment';
import { getLatestFeedPubDate } from "./rss";

test('no items field Parser.Output returns this monday', () => {
  const monday = getThisMonday(moment());
  expect(getLatestFeedPubDate({}, 1).isSame(monday)).toBe(true);
});
