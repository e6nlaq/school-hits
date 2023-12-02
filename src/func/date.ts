
import dayjs from "dayjs";
import isSameOfAfter from 'dayjs/plugin/isSameOrAfter';

// Plugin
dayjs.extend(isSameOfAfter);

/**
 * 与えられた時刻が、午後5時以降か判定する。
 * @param date 判定する時刻
 * @returns 午後5時以降の場合、与えられた時刻の明日を、以前の場合は与えられた時刻を"YYYY-MM-DD"の形式で返す。
 */
export function is_after_pm5(date: dayjs.Dayjs): string {
	if (date.isSameOrAfter(date.startOf('day').add(17, 'hours'))) {
		return date.add(1, 'day').startOf('day').format("YYYY-MM-DD");
	} else {
		return date.startOf('day').format("YYYY-MM-DD");
	}
}
