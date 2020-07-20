import { APIGatewayProxyHandler, ScheduledHandler } from 'aws-lambda';
import 'source-map-support/register';
import { sendToSlack } from './slack';

export const register: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: 'ブログを登録しました。これからは妥協は許しませんよ。'
  };
}

export const remind: ScheduledHandler = async (_, _context) => {
  const text = "TODO: リマインド用メッセージを取得する";
  await sendToSlack(text);
}

export const result: ScheduledHandler = async (_, _context) => {
  const text = "TODO: 結果用メッセージを取得する";
  await sendToSlack(text);
}
