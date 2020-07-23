import * as Parser from 'rss-parser';
import * as moment from 'moment';
import { getThisMonday } from './date';

/**
 * 最新フィードの公開日を取得する
 */
export const getLatestFeedPubDate = (output: Parser.Output, requiredCount: number) => {
  console.log(requiredCount);
  if (!output.items) {
    return getThisMonday(moment());
  }
  return moment();
}