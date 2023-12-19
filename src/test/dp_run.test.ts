
import dayjs from "dayjs";
import * as math from "mathjs";
import { Random, MersenneTwister19937 } from "random-js";

import { dp_run } from "../func/dp";
import { get_month_day, is_after_pm5 } from "../func/date";
import { random_count } from "./test_setting";

const random = new Random(MersenneTwister19937.autoSeed());

describe('roop', () => {
	test.concurrent('length', () => {
		for (let i = 1; i <= 34; ++i) {
			const [m, d] = get_month_day(dayjs(is_after_pm5(dayjs())));
			const plus = Number(m > i) + Number(d > i);

			const result = dp_run(i);
			expect(Object.keys(result).length).toBeLessThanOrEqual(i + plus);
		}
	});
});

describe('error', () => {
	test.concurrent('minus', () => {
		for (let i = 0; i < random_count; ++i) {
			expect(dp_run(random.integer(Number.MIN_SAFE_INTEGER, -1))).rejects.toThrow(RangeError);
		}
	});

	test.concurrent('float', () => {
		for (let i = 0; i < random_count; ++i) {
			let val = random.real(0, Number.MAX_SAFE_INTEGER);

			if (math.isInteger(val)) val = math.add(val, 0.1);

			expect(dp_run(val)).rejects.toThrow(RangeError);
		}
	});
});
