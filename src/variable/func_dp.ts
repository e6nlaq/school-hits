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
];
