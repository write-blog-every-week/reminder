import { UserData } from "./data";
import { makeReminderSendText, getAllClearMessage, getReminderReplaceMessageList } from "./message";

test('all clear message for 0 users', () => {
  const users: UserData[] = [];
  expect(makeReminderSendText(users)).toBe(getAllClearMessage());
});

test('getReminderReplaceMessageList', () => {
  const userA: UserData = {
    userName: 'userA',
    requiredCount: 1,
};
const userB: UserData = {
    userName: 'userB',
    requiredCount: 2,
  };
  const users = [ userA, userB ];
  expect(getReminderReplaceMessageList(users))
      .toBe('<@userA>さん\t残り1記事\n<@userB>さん\t残り2記事\n');
});