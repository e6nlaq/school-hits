/* eslint-disable @typescript-eslint/no-unused-vars */

import { gcd,lcm,sqrt } from '../func/math';

interface func_type {
	0: (a: bigint, b: bigint) => bigint; // 計算する関数
	1: number; // 計算コスト
	2: (a: string, b: string) => string; // 数式を求める関数
}

const bracket = (a: string) => {
	return /^-?\d+$/.test(a) ? a : `(${a})`;
};

export const func_dp: func_type[] = [
	// 足し算
	[(a, b) => a+b, 0.5, (a, b) => `${bracket(a)} + ${bracket(b)}`],

	// 引き算
	[
		(a, b) => a-b,
		0.5,
		(a, b) => `${bracket(a)} - ${bracket(b)}`,
	],

	// 掛け算
	[
		(a, b) => a*b,
		0.8,
		(a, b) => `${bracket(a)} \\times ${bracket(b)}`,
	],

	// 割り算
	[
		(a, b) => a/b,
		1,
		(a, b) => `${bracket(a)} \\div ${bracket(b)}`,
	],

	// mod
	[(a, b) => a%b, 1, (a, b) => `${a} \\mod ${b}`],

	// べき乗
	[
		(a, b) => a**b,
		1,
		(a, b) => `{${bracket(a)}}^{${b}}`,
	],

	// 最大公約数
	[(a, b) => gcd(a, b), 2, (a, b) => `gcd(${a},${b})`],

	// 最小公倍数
	[(a, b) => lcm(a, b), 2, (a, b) => `lcm(${a},${b})`],

	// =====================
	// 一つの値シリーズ
	// =====================

	// 平方根
	[(a, _b) => sqrt(a), 1.5, (a, _b) => `\\sqrt{${a}}`],
];
