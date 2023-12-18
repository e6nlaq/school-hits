
import dayjs from "dayjs";
import * as math from 'mathjs';
import { Queue } from "tstl";

import { func_dp } from "../variable/func_dp";
import { get_month_day } from "./date";

interface dp_type {
	[key: number]: number;
}

export const dp_run = (class_count: number) => {
	// dp初期化
	let dp: dp_type = {};

	const [m, d] = get_month_day(dayjs());
	dp = { [m]: 0, [d]: 0 };

	const q = new Queue<number>();
	q.push(m, d);

	while (!q.empty()) {
		const prev = Object.keys(dp);

		for (let b = 0; b < prev.length; ++b) {
			for (let func_at = 0; func_at < func_dp.length; ++func_at) {
				const A = q.front(), B = Number(prev[b]);

				if (A === B) {
					continue;
				}

				// func_dpの各配列1番目の要素は必ず関数になることが保証されている。
				const func = func_dp[func_at][0] as ((a: number, b: number) => number);
				let result = func(A, B);
				let value = math.chain(math.max(dp[A], dp[B])).add(func_dp[func_at][1] as number).done();

				// 絶対に答えにならない値を省く
				if (result < 0) {
					value += 0.5;
					result = math.abs(result);
				}

				if (result > class_count) {
					value += 0.5;
					result = math.mod(result, class_count);
				}

				if (!math.isInteger(result)) {
					value += 0.5;
					result = math.round(result);
				}


				if (dp[result] === undefined) {
					dp[result] = value;
					q.push(result);
				} else if (dp[result] > value) {
					dp[result] = value;
					q.push(result);
				}
			}
		}

		q.pop();
	}

	return dp;
};
