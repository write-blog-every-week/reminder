import * as AWS from 'aws-sdk'
import { UserData } from "./data";
import { AttributeValueUpdate, AttributeUpdates } from 'aws-sdk/clients/dynamodb';

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
    console.log(err)
  }
}

/**
 * 単体メンバーの情報を取得する
 * @param userId
 * @return UserData
 */
export const findMember = async (userId: string): Promise<UserData> => {
  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const result = await dynamo.get({
      TableName: process.env.TABLE_NAME,
      Key: { user_id: userId }
    }).promise();

    return <UserData>result.Item
  } catch (err) {
    console.log(err)
  }
}

/**
 * ブログの必要記事数をリフレッシュする
 * @param userId 
 * @param count 
 */
export const refreshCount = async (userId: string, count: number): Promise<Boolean> => {
  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    await dynamo.update({
      TableName: process.env.TABLE_NAME,
      Key: { user_id: userId },
      AttributeUpdates: <AttributeUpdates>{
        reqiure_count: <AttributeValueUpdate>{ Value: count }
      }
    }).promise();

    return true
  } catch (err) {
    console.log(err)
    return false;
  }
}

/**
 * 新しいユーザーを追加する
 * @param userData 
 */
export const createUser = async (userData: UserData): Promise<Boolean> => {
  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    await dynamo.put({
      TableName: process.env.TABLE_NAME,
      Item: {
        user_id: userData.userId,
        user_name: userData.userName,
        feed_url: userData.feedUrl,
        require_count: userData.requiredCount,
      }
    }).promise();

    return true
  } catch (err) {
    console.log(err)
    return false;
  }
}

/**
 * ユーザーを削除する
 * @param userId 
 */
export const deleteUser = async (userId: string): Promise<Boolean> => {
  try {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    await dynamo.delete({
      TableName: process.env.TABLE_NAME,
      Key: { user_id: userId }
    }).promise();

    return true
  } catch (err) {
    console.log(err)
    return false;
  }
}
