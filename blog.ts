import { APIGatewayProxyHandler, ScheduledHandler } from 'aws-lambda';
import 'source-map-support/register';
import { sendToSlack, parseParams } from './slack';

export const register: APIGatewayProxyHandler = async (event, _context) => {
  const params = parseParams(event.body);
  if (!params.result) {
    return registerResult(params.text);
  }
  // TODO: 登録処理を実行する
  return registerResult('ブログを登録しました。これからは妥協は許しませんよ。');
}

const registerResult = (message: string | string[]) => {
  return {
    statusCode: 200,
    body: message.toString()
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
