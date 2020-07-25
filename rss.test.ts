import { getThisMonday } from "./date";
import * as moment from 'moment';
import { getLatestFeedPubDate, findTargetUserList } from "./rss";

const nowDate = moment('2020-07-17T15:00:01.000Z');
/**
 * 2020-07-13T00:00:00+09:00
 */
const monday = getThisMonday(nowDate);

test('no items field Parser.Output returns this monday', () => {
  expect(getLatestFeedPubDate({}, 1, monday).isSame(monday)).toBe(true);
});

test('not enough items for requiredCount + 1, returns this monday', () => {
  const output = {
    items: [{
      pubDate: '2020-07-16T15:00:01.000Z'
    }]
  };
  expect(getLatestFeedPubDate(output, 1, monday).isSame(monday)).toBe(true);
});

test('2 items required, returns pubDate of 3rd item', () => {
  const expected = moment('2020-07-14T15:00:01.000Z');
  const output = {
    items: [{
      pubDate: '2020-07-16T15:00:01.000Z'
    }, {
      pubDate: '2020-07-15T15:00:01.000Z'
    }, {
      pubDate: '2020-07-14T15:00:01.000Z'
    }]
  };
  expect(getLatestFeedPubDate(output, 2, monday).isSame(expected)).toBe(true);
});

test('2 items required, returns this Monday if pubDate of 3rd item is undefined', () => {
  const output = {
    items: [{
      pubDate: '2020-07-16T15:00:01.000Z'
    }, {
      pubDate: '2020-07-15T15:00:01.000Z'
    }, {}]
  };
  expect(getLatestFeedPubDate(output, 2, monday).isSame(monday)).toBe(true);
});

const item_0 = `
<!--?xml version="1.0" encoding="UTF-8"?-->
<feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
  <id>item_0</id>
</feed>`;

const item_1 = `
<!--?xml version="1.0" encoding="UTF-8"?-->
<feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
  <id>item_1</id>
  <entry>
    <id>item_1_1</id>
    <title>item 1 of 1</title>
    <published>2020-07-14T09:10:11+09:00</published>
  </entry>
</feed>`;

const item_2 = `
<!--?xml version="1.0" encoding="UTF-8"?-->
<feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
  <id>item_2</id>
  <entry>
    <id>item_2_1</id>
    <title>item 1 of 2</title>
    <published>2020-07-15T18:10:11+09:00</published>
  </entry>
  <entry>
    <id>item_2_2</id>
    <title>item 2 of 2</title>
    <published>2020-07-14T19:10:11+09:00</published>
  </entry>
</feed>`;

test('findTargetUserList: 0 required returns 0', () => {
  const users = [{
    userId: 'user1',
    userName: 'user 1',
    feedUrl: item_1,
    requiredCount: 0
  }];
  return findTargetUserList(users, monday).then(data => {
    expect(data).toEqual([{
      userId: 'user1',
      requiredCount: 0
    }]);
  });
});

test('findTargetUserList: 1 more required returns 1', () => {
  const users = [{
    userId: 'user1',
    userName: 'user 1',
    feedUrl: item_1,
    requiredCount: 2
  }, {
    userId: 'user2',
    userName: 'user 2',
    feedUrl: item_0,
    requiredCount: 1,
  }];
  return findTargetUserList(users, monday).then(data => {
    expect(data).toEqual([{
      userId: 'user1',
      requiredCount: 1
    }, {
      userId: 'user2',
      requiredCount: 1
    }]);
  });
});

test('findTargetUserList: 2 required, 2 blogs written, returns 0', () => {
  const users = [{
    userId: 'user3',
    userName: 'user 3',
    feedUrl: item_2,
    requiredCount: 2
  }];
  return findTargetUserList(users, monday).then(data => {
    expect(data).toEqual([{
      userId: 'user3',
      requiredCount: 0
    }]);
  });
});