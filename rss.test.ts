import { getThisMonday } from "./date";
import * as moment from 'moment';
import { getLatestFeedPubDate, findTargetUserList } from "./rss";

const nowDate = moment('2020-07-24T15:00:01.000Z');

test('no items field Parser.Output returns this monday', () => {
  const monday = getThisMonday(nowDate);
  expect(getLatestFeedPubDate({}, 1).isSame(monday)).toBe(true);
});

test('not enough items for requiredCount + 1, returns this monday', () => {
  const monday = getThisMonday(nowDate);
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

test('2 items required, returns this Monday if pubDate of 3rd item is undefined', () => {
  const monday = getThisMonday(nowDate);
  const output = {
    items: [{
      pubDate: '2020-07-23T15:00:01.000Z'
    }, {
      pubDate: '2020-07-22T15:00:01.000Z'
    }, {}]
  };
  expect(getLatestFeedPubDate(output, 2).isSame(monday)).toBe(true);
});

const item_1 = `
  <feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
    <entry>
      <published>2020-07-21T09:10:11+09:00</published>
    </entry>
  </feed>
`;

test('findTargetUserList: 0 required returns 0', () => {
  const users = [{
    userId: 'user1',
    userName: 'user 1',
    feedUrl: item_1,
    requiredCount: 0
  }];
  return findTargetUserList(users, nowDate).then(data => {
    expect(data).toEqual([{
      userId: 'user1',
      requiredCount: 0
    }]);
  });
});
