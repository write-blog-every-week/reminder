import axios from 'axios';

const SLACK_API_URL = process.env.WBEW_SLACK_API_URL;
const SLACK_CHANNEL_NAME = process.env.WBEW_SLACK_CHANNEL_NAME;

export const sendToSlack = async (text: string) => {
  const data = textToData(text);
  const res = await axios.post(SLACK_API_URL, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(res);
}

const textToData = (text: string) => {
  return {
    text: text,
    channel: SLACK_CHANNEL_NAME,
    link_names: 1
  };
}