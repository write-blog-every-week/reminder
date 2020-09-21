import * as AWS from 'aws-sdk'
import { APIGatewayProxyHandler, ScheduledHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createUser, findMember, findMembers, refreshCount, userRefreshCount } from './database';
import { sendToSlack, parseParams } from './slack';
import { UserData } from './data';
import { getLastWeekMonday, getThisMonday } from './date';
import { findTargetUserList } from './rss';
import { makeReminderSendText, makeResultSendText } from './message';
import { Server } from 'http';

/**
 * ブログの登録
 * @param event 
 * @param _context 
 */
export const register: APIGatewayProxyHandler = async (event, _context) => {
  const params = parseParams(event.body);
  if (!params.result) {
    return registerResult(params.text);
  }

  const dynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.WBEW_AWS_ACCESS_KEY,
    secretAccessKey: process.env.WBEW_AWS_SECRET_KEY,
    region: process.env.WBEW_AWS_REGION,
  });

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


/**
 * ブログのリマインド
 * @param _ 
 * @param _context 
 */
export const remind: ScheduledHandler = async (_, _context) => {
  const users = await findMembers(new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.WBEW_AWS_ACCESS_KEY,
    secretAccessKey: process.env.WBEW_AWS_SECRET_KEY,
    region: process.env.WBEW_AWS_REGION,
  }))

  const targetUsers = await findTargetUserList(users, getThisMonday())
  const message     = makeReminderSendText(targetUsers)
  await sendToSlack(message)
}


/**
 * ブログ書けたかどうか通知
 * @param _ 
 * @param _context 
 */
export const result: ScheduledHandler = async (_, _context) => {
  const dynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.WBEW_AWS_ACCESS_KEY,
    secretAccessKey: process.env.WBEW_AWS_SECRET_KEY,
    region: process.env.WBEW_AWS_REGION,
  });

  const users = await findMembers(dynamo)
  const targetUsers = (await findTargetUserList(users, getLastWeekMonday())).map((user) => {
    // 0の人は1になり、1以上の人は1記事増える
    user.requiredCount++
    return user
  })

  await userRefreshCount(targetUsers, dynamo)
  const message = makeResultSendText(targetUsers)
  await sendToSlack(message)
}
