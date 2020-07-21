import { UserData } from "./data";

export const makeReminderSendText = (users: UserData[]) => {
  switch (users.length) {
    case 0:
      return getAllClearMessage();
    default:
      const list = getReminderReplaceMessageList(users);
      return `
<!channel>
まだブログを書けていないユーザーがいます！
今週中に書けるようみんなで煽りましょう！
書けていないユーザー: ${users.length}人
================
${list}`;
  }
}

export const getAllClearMessage = () => {
  return `
<!channel>
今週は全員がブログを書きました！ :tada:
やったね！！！
`;
}

export const getReminderReplaceMessageList = (users: UserData[]) => {
  let list = '';
  users.forEach(user => {
    list += `<@${user.userName}>さん\t残り${user.requiredCount}記事\n`;
  });
  return list;
}
