import * as AWS from 'aws-sdk'
import { APIGatewayProxyHandler, ScheduledHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createUser, findMember } from './database';
import { sendToSlack, parseParams } from './slack';
import { UserData } from './data';

export const register: APIGatewayProxyHandler = async (event, _context) => {
  const params = parseParams(event.body);
  if (!params.result) {
    return registerResult(params.text);
  }

  const dynamo = new AWS.DynamoDB.DocumentClient();
  const registeredUser = await findMember(<string>params.userId, dynamo)
  if (registeredUser.userId !== '') {
    console.log('すでに登録済みです')
    return;
  }

  await createUser(<UserData>{
    userId: params.userId,
    userName: params.userName,
    feedUrl: params.text,
    requiredCount: 1,
  }, dynamo)

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
