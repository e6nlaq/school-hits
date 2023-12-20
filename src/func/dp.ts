
import dayjs from "dayjs";
import * as math from 'mathjs';
import { Queue, HashSet } from "tstl";

import { func_dp } from "../variable/func_dp";
import { get_month_day, is_after_pm5 } from "./date";

export interface dp_type {
	[key: number]: number;
}

export const dp_run = (class_count: number, date: dayjs.Dayjs = dayjs(is_after_pm5(dayjs()))): dp_type => {
	if (!math.isInteger(class_count) || math.isNegative(class_count)) {
		throw new RangeError(`引数は非負整数である必要があります。(値: ${class_count})`);
	}

	// dp初期化
	let dp: dp_type = {};

	const [y, m, d] = get_month_day(date);
	dp = { [y]: 1.5, [m]: 0.25, [d]: 0 };

	// Queue初期化	
	const q = new Queue<number>();
	q.push(m, d);

	// HashSet初期化
	const dat = new HashSet<number>([m, d]);

	while (!q.empty()) {
		const prev = Object.keys(dp);

		for (let b = 0; b < prev.length; ++b) {
			for (let func_at = 0; func_at < func_dp.length; ++func_at) {
				const A = q.front(), B = Number(prev[b]);

				if (prev.length !== 1 && A === B) {
					continue;
				}

				// func_dpの各配列1番目の要素は必ず関数になることが保証されている。
				const func = func_dp[func_at][0] as ((a: number, b: number) => number);
				let result = func(A, B);
				let value = math.chain(math.max(dp[A], dp[B])).add(func_dp[func_at][1] as number).done();

				// *****************************
				// 絶対に答えにならない値を省く・整形
				// *****************************

				// 0未満
				if (result < 0) {
					value += 0.5;
					result = math.abs(result);
				}

				// 小数
				if (!math.isInteger(result)) {
					value += 0.5;
					result = math.round(result);
				}

				// クラスの人数より多い
				if (result > class_count) {
					value += 0.5;
					result = math.mod(result, class_count) + 1;
				}

				// 0・NaN・Infinity
				if (result === 0 || Number.isNaN(result) || result === Infinity) continue;

				if (dp[result] === undefined || dp[result] > value) {
					dp[result] = value;

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
