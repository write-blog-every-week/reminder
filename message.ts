import { BlogCount } from "./data";

const MAX_BLOG_QUOTA = Number(process.env.WBEW_MAX_BLOG_QUOTA);

export const makeReminderSendText = (users: BlogCount[]) => {
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

export const getReminderReplaceMessageList = (users: BlogCount[]) => {
  let list = '';
  users.forEach(user => {
    list += `<@${user.userId}>さん\t残り${user.requiredCount}記事\n`;
  });
  return list;
}

export const makeResultSendText = (users: BlogCount[]) => {
  return `
<!channel>
1週間お疲れ様でした！
今週も頑張ってブログを書きましょう！
先週ブログを書けていない人は今週書くブログ記事が増えていることを確認してください！
================
${getReminderReplaceMessageList(users.filter(u => u.requiredCount <= MAX_BLOG_QUOTA))}================

${getCancelReplaceMessageList(users.filter(u => u.requiredCount > MAX_BLOG_QUOTA))}
`;
}

export const getCancelReplaceMessageList = (users: BlogCount[]) => {
  if (users.length === 0) {
    return getZeroCancelMessage();
  }
  return `残念ながら以下の方は退会となります :cry:
================
${getReminderReplaceMessageList(users)}================`;
}

export const getZeroCancelMessage = () => {
  return '今週は退会対象者はいません！ :tada:';
}