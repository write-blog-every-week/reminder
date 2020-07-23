import * as AWS from 'aws-sdk'
import { UserData } from "./data";

/**
 * メンバー全員の情報を取得する
 * @return UserData[]
 */
export const findMembers = async (): Promise<UserData[]> => {
  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const result = await dynamo.scan({
      TableName: process.env.TABLE_NAME
    }).promise();

    return <UserData[]>result.Items
  } catch (err) {
    // todo エラー処理どうする？
  }
}

/**
 * 単体メンバーの情報を取得する
 * @param userId
 * @return UserData
 */
export const findMember = async (userId: number): Promise<UserData> => {
  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const result = await dynamo.get({
      TableName: process.env.TABLE_NAME,
      Key: { user_id: userId }
    }).promise();

    return <UserData>result.Item
  } catch (err) {
    // todo エラー処理どうする？
  }
}