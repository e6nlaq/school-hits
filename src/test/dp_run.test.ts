import dayjs from 'dayjs';

import { dp_run } from '../func/dp';
import { get_dates, is_after_pm5 } from '../func/date';

describe('roop', () => {
	test.concurrent('length', () => {
		for (let i = 1; i <= 10; ++i) {
			const [y, m, d] = get_dates(dayjs(is_after_pm5(dayjs())));
			const plus = Number(m > i) + Number(d > i) + Number(y > i);

			const result = dp_run(i, dayjs(is_after_pm5(dayjs())), true, true);
			expect(Object.keys(result).length).toBeLessThanOrEqual(i + plus);
		}
	});
});

describe('option', () => {
	test.concurrent('year', () => {
		const result = dp_run(100, dayjs('2024-1-1'), true, false);
		expect(result[2024]).toBe(0);
	});

	test.concurrent('month', () => {
		const result = dp_run(100, dayjs('2024-1-1'), false, true);

		expect(result[1]).toBe(0);
	});
});
