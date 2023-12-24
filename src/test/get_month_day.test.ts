import dayjs from 'dayjs';

import { get_month_day } from '../func/date';

describe('roop', () => {
	test.concurrent('day', () => {
		for (let d: number = 1; d <= 31; ++d) {
			expect(get_month_day(dayjs(`2023/1/${d}`))).toStrictEqual([
				2023,
				1,
				d,
			]);
		}
	});

	test.concurrent('month', () => {
		for (let m: number = 1; m <= 12; ++m) {
			expect(get_month_day(dayjs(`2023/${m}/1`))).toStrictEqual([
				2023,
				m,
				1,
			]);
		}
	});

	test.concurrent('year', () => {
		for (let y: number = 1990; y <= 2040; ++y) {
			expect(get_month_day(dayjs(`${y}/1/1`))).toStrictEqual([y, 1, 1]);
		}
	});
});
