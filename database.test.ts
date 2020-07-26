import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { ScanInput } from "aws-sdk/clients/dynamodb";
import {findMember, findMembers} from "./database";


test('findMembers', async () => {
    AWSMock.setSDKInstance(AWS);
    // @ts-ignore
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params: ScanInput, callback: Function) => {
        callback(null, { Items: [
            {
                userId: '001',
                userName: 'aaa',
                feedUrl: 'http://example.com',
                requiredCount: 1,
            },
            {
                userId: '002',
                userName: 'bbb',
                feedUrl: 'http://example.com',
                requiredCount: 2,
            },
        ] });
    })

    const result = await findMembers()
    expect(result[0].userId).toBe('001');
    expect(result[1].userId).toBe('002');
})

test('findMember', async () => {
    AWSMock.setSDKInstance(AWS);
    // @ts-ignore
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: GetItemInput, callback: Function) => {
        callback(null, { Item: {
            userId: '001',
            userName: 'aaa',
            feedUrl: 'http://example.com',
            requiredCount: 1,
        }});
    })

    const result = await findMember(1)
    expect(result.userId).toBe('001');
})
