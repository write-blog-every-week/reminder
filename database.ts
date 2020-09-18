import { UserData } from "./data";
import { AttributeValueUpdate, AttributeUpdates, DocumentClient } from 'aws-sdk/clients/dynamodb';

/**
 * メンバー全員の情報を取得する
 * @param dynamo 
 */
export const findMembers = async (dynamo: DocumentClient): Promise<UserData[]> => {
  try {
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
 * @param dynamo 
 */
export const findMember = async (userId: string, dynamo: DocumentClient): Promise<UserData> => {
  try {
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
 * @param dynamo 
 */
export const refreshCount = async (userId: string, count: number, dynamo: DocumentClient): Promise<Boolean> => {
  try {
    await dynamo.update({
      TableName: process.env.TABLE_NAME,
      Key: { user_id: userId },
      AttributeUpdates: <AttributeUpdates>{
        require_count: <AttributeValueUpdate>{ Value: count }
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
 * @param dynamo 
 */
export const createUser = async (userData: UserData, dynamo: DocumentClient): Promise<Boolean> => {
  try {
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
