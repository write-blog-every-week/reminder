import { UserData } from "./data";
import { makeReminderSendText, getAllClearMessage } from "./message";

test('all clear message for 0 users', () => {
  const users: UserData[] = [];
  expect(makeReminderSendText(users)).toBe(getAllClearMessage());
});
