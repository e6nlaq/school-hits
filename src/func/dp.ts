
import Cookies from "js-cookie";
import dayjs from "dayjs";

import { func_dp } from "../variable/func_dp";
import { get_month_day } from "./date";
import * as math from 'mathjs';

interface dp_type {
	[key: number]: number;
}

export const dp_run = () => {
	const N = Number(Cookies.get("dp_count"));
	const class_count = Number(Cookies.get("class_count"));

	// dp初期化
	const dp: dp_type[] = new Array(N + 1).fill(Object.assign({}, {}));

	const [m, d] = get_month_day(dayjs());
	dp[0] = { [m]: 0, [d]: 0 };

	for (let i = 1; i <= N; ++i) {
		dp[i] = Object.assign({}, dp[i - 1]);

		// 1つ前のdpのkey一覧
		const prev = Object.keys(dp[i - 1]);

		for (let a = 0; a < prev.length; ++a) {
			for (let b = 0; b < prev.length; ++b) {
				for (let func_at = 0; func_at < func_dp.length; ++func_at) {
					const A = Number(prev[a]), B = Number(prev[b]);

					if (a == b) {
						continue;
					}

					// func_dpの各配列1番目の要素は必ず関数になることが保証されている。
					const func = func_dp[func_at][0] as ((a: number, b: number) => number);
					let result = func(A, B);
					let value = math.chain(math.max(dp[i - 1][A], dp[i - 1][B])).add(func_dp[func_at][1] as number).done();

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


					if (dp[i][result] === undefined) {
						dp[i][result] = value;
					} else if (dp[i][result] > value) {
						dp[i][result] = value;
					}
				}
			}
		}
		console.log(`${i}/${N} (length: ${Object.keys(dp[i]).length})`);

		if (dp[i - 1] === dp[i]) {
			dp[N] = Object.assign({}, dp[i]);
			return dp;
		}
	}

	return dp;
};
