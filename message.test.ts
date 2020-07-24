import { BlogCount } from "./data";
import { makeReminderSendText, getAllClearMessage, getReminderReplaceMessageList, makeResultSendText, getCancelReplaceMessageList, getZeroCancelMessage } from "./message";

test('all clear reminder message for 0 users', () => {
  const users: BlogCount[] = [];
  expect(makeReminderSendText(users)).toBe(getAllClearMessage());
});

test('getReminderReplaceMessageList', () => {
  const userA: BlogCount = {
    userId: 'userA',
    requiredCount: 1,
  };
  const userB: BlogCount = {
    userId: 'userB',
    requiredCount: 2,
  };
  const users = [ userA, userB ];
  expect(getReminderReplaceMessageList(users))
      .toBe('<@userA>さん\t残り1記事\n<@userB>さん\t残り2記事\n');
});

test('result message', () => {
  const userA: BlogCount = {
    userId: 'userA',
    requiredCount: 1,
  };
  const userB: BlogCount = {
    userId: 'userB',
    requiredCount: 3,
  };
  const userC: BlogCount = {
    userId: 'userC',
    requiredCount: 2,
  };
  const users = [ userA, userB, userC ];
  expect(makeResultSendText(users))
      .toBe(`
<!channel>
1週間お疲れ様でした！
今週も頑張ってブログを書きましょう！
先週ブログを書けていない人は今週書くブログ記事が増えていることを確認してください！
================
<@userA>さん\t残り1記事
<@userC>さん\t残り2記事
================

残念ながら以下の方は退会となります :cry:
================
<@userB>さん\t残り3記事
================
`);
});

test('cancel user 0 message', () => {
  const users: BlogCount[] = [];
  expect(getCancelReplaceMessageList(users))
      .toBe(getZeroCancelMessage());
});