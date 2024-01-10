import { Random, MersenneTwister19937 } from 'random-js';

import { bracket } from '../variable/func_dp';
import { random_count } from './test_setting';

const random = new Random(MersenneTwister19937.autoSeed());

describe('sample', () => {
	test.concurrent('number', () => {
		for (let i = 0; i <= 10000; ++i) {
			expect(bracket(String(i))).toBe(String(i));
		}
	});

	test.concurrent('string', () => {
		for (let i = 0; i <= 10000; ++i) {
			expect(bracket(`${i}+1`)).toBe(`(${i}+1)`);
		}
	});
});

describe('random', () => {
	test.concurrent('number', () => {
		for (let i = 0; i < random_count; ++i) {
			const x = random.uint53();
			expect(bracket(String(x))).toBe(String(x));
		}
	});

	test.concurrent('string', () => {
		for (let i = 0; i < random_count; ++i) {
			const x = random.string(100);
			expect(bracket(x + 'a')).toBe(`(${x}a)`);
		}
	});
});
