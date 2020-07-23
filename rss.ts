import * as Parser from 'rss-parser';
import * as moment from 'moment';
import { getThisMonday } from './date';

/**
 * 最新フィードの公開日を取得する
 */
export const getLatestFeedPubDate = (output: Parser.Output, requiredCount: number) => {
  if (!output.items|| output.items.length < requiredCount + 1) {
    // そもそも記事数が足りない場合は公開日を取得できないのでlatestは、必ず通知対象となる今週の月曜日と合わせる
    return getThisMonday(moment());
  }
  return moment(output.items[requiredCount].pubDate);
}