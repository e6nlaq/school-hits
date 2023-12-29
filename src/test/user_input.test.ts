import { MersenneTwister19937, Random } from 'random-js';

import { input_format } from '../func/user_input';
import { random_count } from './test_setting';

const random = new Random(MersenneTwister19937.autoSeed());

describe('integer', () => {
	test.concurrent('min', () => {
		for (let value = 99; value >= -100; --value) {
			for (let min = 100; min < 200; ++min) {
				expect(input_format(value, min, Infinity, true)).toBe(min);
			}
		}
	});

	test.concurrent('max', () => {
		for (let value = 1000; value < 1100; ++value) {
			for (let max = 100; max < 200; ++max) {
				expect(input_format(value, -Infinity, max, true)).toBe(max);
			}
		}
	});

	test.concurrent('value', () => {
		for (let value = -10000; value <= 10000; ++value) {
			expect(input_format(value, -Infinity, Infinity, true)).toBe(value);
		}
	});

	test.concurrent('float', () => {
		for (let value = -1000; value <= 1000; value += 0.1) {
			expect(input_format(value, -Infinity, Infinity, true)).toBe(
				Math.round(value)
			);
		}
	});
});

describe('integer_random', () => {
	test.concurrent('min', () => {
		for (let i = 0; i < random_count; ++i) {
			const min = random.integer(0, Number.MAX_SAFE_INTEGER);
			const value = random.integer(Number.MIN_SAFE_INTEGER, min - 1);

			expect(input_format(value, min, Infinity, true)).toBe(min);
		}
	});

	test.concurrent('max', () => {
		for (let i = 0; i < random_count; ++i) {
			const max = random.integer(Number.MIN_SAFE_INTEGER, 0);
			const value = random.integer(max + 1, Number.MAX_SAFE_INTEGER);

			expect(input_format(value, -Infinity, max, true)).toBe(max);
		}
	});

	test.concurrent('value', () => {
		for (let i = 0; i < random_count; ++i) {
			const value = random.integer(
				Number.MIN_SAFE_INTEGER,
				Number.MAX_SAFE_INTEGER
			);
			expect(input_format(value, -Infinity, Infinity, true)).toBe(value);
		}
	});

	test.concurrent('float', () => {
		for (let i = 0; i < random_count; ++i) {
			const value = random.real(
				Number.MIN_SAFE_INTEGER,
				Number.MAX_SAFE_INTEGER
			);
			expect(input_format(value, -Infinity, Infinity, true)).toBe(
				Math.round(value)
			);
		}
	});
});

describe('float', () => {
	test.concurrent('min', () => {
		for (let value = 99; value >= 0; value -= 0.1) {
			for (let min = 100; min < 110; min += 0.1) {
				expect(input_format(value, min, Infinity, false)).toBe(min);
			}
		}
	});

	test.concurrent('max', () => {
		for (let value = 1000; value < 1010; value += 0.1) {
			for (let max = 100; max < 110; max += 0.1) {
				expect(input_format(value, -Infinity, max, false)).toBe(max);
			}
		}
	});

	test.concurrent('value', () => {
		for (let value = -100; value <= 100; value += 0.1) {
			expect(input_format(value, -Infinity, Infinity, false)).toBe(value);
		}
	});
});

describe('float_random', () => {
	test.concurrent('min', () => {
		for (let i = 0; i < random_count; ++i) {
			const min = random.real(0, Number.MAX_SAFE_INTEGER);
			const value = random.real(Number.MIN_SAFE_INTEGER, min - 1);

			expect(input_format(value, min, Infinity, false)).toBe(min);
		}
	});

	test.concurrent('max', () => {
		for (let i = 0; i < random_count; ++i) {
			const max = random.real(Number.MIN_SAFE_INTEGER, 0);
			const value = random.real(max + 1, Number.MAX_SAFE_INTEGER);

			expect(input_format(value, -Infinity, max, false)).toBe(max);
		}
	});

	test.concurrent('value', () => {
		for (let i = 0; i < random_count; ++i) {
			const value = random.real(
				Number.MIN_SAFE_INTEGER,
				Number.MAX_SAFE_INTEGER
			);
			expect(input_format(value, -Infinity, Infinity, false)).toBe(value);
		}
	});
});
