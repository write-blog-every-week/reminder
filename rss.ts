import * as Parser from 'rss-parser';
import * as moment from 'moment';
import { getThisMonday } from './date';
import { UserData, BlogCount } from './data';

const parser = new Parser();

const parse = async (feedUrlOrXml: string) => {
  if (!feedUrlOrXml.startsWith("http")) {
    // for testing purpose
    return await parser.parseString(feedUrlOrXml);
  }
  return await parser.parseURL(feedUrlOrXml);
}

export const findTargetUserList = async (users: UserData[], targetMonday = getThisMonday()): Promise<BlogCount[]> => {
  const result: BlogCount[] = [];
  for (let user of users) {
    const output = await parse(user.feedUrl);
    result.push({
      userId: user.userId,
      requiredCount: calcRequiredCount(user.requiredCount, targetMonday, output)
    });
  };
  return result;
}

const calcRequiredCount = (requiredCount: number, targetMonday: moment.Moment, output: Parser.Output) => {
  let result = 0;
  for (let i = 0; i < requiredCount; i++) {
    const latestPublishedDate = getLatestFeedPubDate(output, i, targetMonday);
    if (targetMonday.isSameOrAfter(latestPublishedDate)) {
      result++;
    }
  }
  return result;
}

/**
 * 最新フィードの公開日を取得する
 */
export const getLatestFeedPubDate = (output: Parser.Output, requiredCount: number, targetMonday = getThisMonday()) => {
  if (!output.items || output.items.length < requiredCount + 1) {
    // そもそも記事数が足りない場合は公開日を取得できないのでlatestは、必ず通知対象となる今週の月曜日と合わせる
    return targetMonday;
  }
  const pubDate = output.items[requiredCount].pubDate;
  if (!pubDate) {
    return targetMonday;
  }
  return moment(pubDate);
}