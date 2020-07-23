import { parseParams } from "./slack";

test('parseParams wrong token', () => {
  const query = "token=XXX&text=parseParamsWrongTokenTest";
  const actual = parseParams(query);
  expect(actual.result).toBe(false);
  expect(actual.text).toBe('トークンの不一致');
  expect(actual.userId).toBeUndefined();
  expect(actual.userName).toBeUndefined();
});

test('parseParams right token', () => {
  const query = "token=rightToken&text=parseParamsRightTokenTest&user_name=user1&user_id=userA";
  const actual = parseParams(query);
  expect(actual.result).toBe(true);
  expect(actual.text).toBe('parseParamsRightTokenTest');
  expect(actual.userId).toBe('userA');
  expect(actual.userName).toBe('user2');
});
