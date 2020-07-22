import axios from 'axios';
import { parse } from 'querystring';

const API_URL = process.env.WBEW_SLACK_API_URL;
const CHANNEL_NAME = process.env.WBEW_SLACK_CHANNEL_NAME;
const TOKEN = process.env.WBEW_SLACK_TOKEN;

export const sendToSlack = async (text: string) => {
  const data = textToData(text);
  const res = await axios.post(API_URL, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(res);
}

const textToData = (text: string) => {
  return {
    text: text,
    channel: CHANNEL_NAME,
    link_names: 1
  };
}

type ParseResult = {
  result: boolean;
  text: string | string[];
  userId?: string | string[];
  userName?: string | string[];
};

export const parseParams = (query: string): ParseResult => {
  const q = parse(query);
  console.log('Parsed:', q);
  if (q.token !== TOKEN) {
    return {
      result: false,
      text: 'トークンの不一致'
    };
  }
  return {
    result: true,
    text: q.text,
    userId: q.user_id,
    userName: q.user_name
  };
}
