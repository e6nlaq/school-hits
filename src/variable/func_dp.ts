/* eslint-disable @typescript-eslint/no-unused-vars */

import * as math from 'mathjs';

interface func_type {
	0: (a: number, b: number) => number;
	1: number;
}

export const func_dp: func_type[] = [
	// 足し算
	[(a: number, b: number) => math.add(a, b), 1],

	// 引き算
	[(a: number, b: number) => math.subtract(a, b), 1],

	// 掛け算
	[(a: number, b: number) => math.multiply(a, b), 1],

	// 割り算
	[(a: number, b: number) => math.divide(a, b), 1],

	// mod
	[(a: number, b: number) => math.mod(a, b), 1],

	// 最大公約数
	[(a: number, b: number) => math.gcd(a, b), 2],

	// 最小公倍数
	[(a: number, b: number) => math.lcm(a, b), 2],

	// log
	[(a: number, b: number) => math.log(a, b), 2],

	// =====================
	// 一つの値シリーズ
	// =====================

	// 平方根
	[(a: number, _b: number) => Number(math.sqrt(a)), 1.5],

	// sin
	[(a: number, _b: number) => math.sin(a), 3],

	// cos
	[(a: number, _b: number) => math.cos(a), 3],

	// tan
	[(a: number, _b: number) => math.tan(a), 3],
];
