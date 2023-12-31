import dayjs from 'dayjs';
import * as math from 'mathjs';
import { Queue, HashSet } from 'tstl';

import { func_dp } from '../variable/func_dp';
import { get_dates } from './date';

// keyが数値のオブジェクト型
export interface dp_type {
	[key: number]: number;
}

/**
 * dp?を実行する
 * @param class_count クラスの人数
 * @param date 計算する元の日付
 * @param year 年を初期値に含むか
 * @param month 月を初期値に含むか
 * @returns {{[key:number]:number}}
 */
export const dp_run = (
	class_count: number,
	date: dayjs.Dayjs,
	year: boolean,
	month: boolean
): dp_type => {
	if (!math.isInteger(class_count) || math.isNegative(class_count)) {
		throw new RangeError(
			`引数は非負整数である必要があります。(値: ${class_count})`
		);
	}

	// dp初期化
	let dp: dp_type = {};

	const [y, m, d] = get_dates(date);
	dp = { [d]: 0 };

	if (year) {
		dp[y] = 1.5;
	}

	if (month) {
		dp[m] = 0.5;
	}

	// Queue初期化
	const q = new Queue<number>();
	q.push(m, d);

	// HashSet初期化
	const dat = new HashSet<number>([m, d]);

	while (!q.empty()) {
		const prev = Object.keys(dp);

		for (let b = 0; b < prev.length; ++b) {
			for (let func_at = 0; func_at < func_dp.length; ++func_at) {
				const A = q.front(),
					B = Number(prev[b]);

				if (prev.length !== 1 && A === B) {
					continue;
				}

				const func = func_dp[func_at][0];
				let result = func(A, B);
				let value = math
					.chain(math.max(dp[A], dp[B]))
					.add(func_dp[func_at][1] as number)
					.done();

				// *****************************
				// 絶対に答えにならない値を省く・整形
				// *****************************

				// 0未満
				if (result < 0) {
					value =math.add(value,0.5);
					result = math.abs(result);
				}

				// 小数
				if (!math.isInteger(result)) {
					value =math.add(value,0.1);
					result = math.floor(result);
				}

				// クラスの人数より多い
				if (result > class_count) {
					value=math.add(value,0.3);
					result = math.mod(result, class_count) + 1;
				}

				// 0・NaN・Infinity
				if (result === 0 || Number.isNaN(result) || result === Infinity)
					continue;

				if (dp[result] === undefined || dp[result] > value) {
					dp[result] = math.round(value,2);

					if (!dat.has(result)) {
						q.push(result);
						dat.insert(result);
					}
				}
			}
		}

		dat.erase(q.front());
		q.pop();
	}

	console.log(dp);

	return dp;
};
