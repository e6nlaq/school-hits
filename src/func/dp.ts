import dayjs from 'dayjs';
import * as math from 'mathjs';
import { Queue, HashSet } from 'tstl';

import { func_dp } from '../variable/func_dp';
import { get_dates } from './date';

export interface dp_values{
	value: number;
	equa:string
}

// keyが数値のオブジェクト型
export interface dp_type {
	[key: number]: dp_values;
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
	dp = { [d]: {value:0,equa:`${d}`} };

	// Queue初期化
	const q = new Queue<number>();
	q.push(d);

	if (year) {
		dp[y] = { value: 0.7, equa: `${y}` };
		q.push(y);
	}

	if (month) {
		dp[m] = { value: 0, equa: `${m}` };
		q.push(m);
	}


	// HashSet初期化
	const dat = new HashSet<number>([m, d]);

	while (!q.empty()) {
		const prev = Object.keys(dp);

		for (let b = 0; b < prev.length; ++b) {
			for (let func_at = 0; func_at < func_dp.length; ++func_at) {
				const A = q.front(),
					B = Number(prev[b]);

				const func = func_dp[func_at][0];
				const equa_func = func_dp[func_at][2];

				if (dp[A] === undefined || dp[B] === undefined) {
					throw new Error(`${JSON.stringify(dp)} ${A} ${B}`);
				}

				let result = func(A, B);
				let value = math
					.chain(math.add(dp[A].value, dp[B].value))
					.add(func_dp[func_at][1])
					.done();
				let equa = equa_func(dp[A].equa, dp[B].equa);
				
				// *****************************
				// 絶対に答えにならない値を省く・整形
				// *****************************

				// 0未満
				if (result < 0) {
					value = math.add(value, 0.3);
					result = math.abs(result);
					equa="| "+equa+" |"
				}

				// 小数
				if (!math.isInteger(result)) {
					value = math.add(value, 0.2);
					result = math.floor(result);
					equa="\\lfloor "+equa+" \\rfloor"
				}

				// クラスの人数より多い
				if (result > class_count) {
					value = math.add(value, 0.7);
					result = math.mod(result, class_count) + 1;
					equa = `\\{(${equa}) \\mod ${class_count} \\} + 1`;
				}

				// 0・NaN・Infinity
				if (result === 0 || Number.isNaN(result) || result === Infinity)
					continue;

				if (dp[result] === undefined || dp[result].value > value) {
					if (dp[result] === undefined) dp[result] = { value: -1, equa:"???" };

					dp[result].value = math.round(value, 2);
					dp[result].equa = equa;

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
