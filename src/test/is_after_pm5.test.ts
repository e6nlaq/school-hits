import dayjs from 'dayjs';

import { is_after_pm5 } from '../func/date';

function zfill(a: number, n: number): string {
	return String(a).padStart(n, '0');
}

describe('all', () => {
	test.concurrent('after_pm5', () => {
		for (let h: number = 17; h <= 23; ++h) {
			for (let m: number = 0; m < 60; ++m) {
				expect(
					is_after_pm5(
						dayjs(`2023/1/1 ${zfill(h, 2)}:${zfill(m, 2)}`),
					),
				).toBe('2023-01-02');
			}
		}
	});

	test.concurrent('before_pm5', () => {
		for (let h: number = 16; h >= 0; --h) {
			for (let m: number = 59; m >= 0; --m) {
				expect(
					is_after_pm5(
						dayjs(`2023/1/1 ${zfill(h, 2)}:${zfill(m, 2)}`),
					),
				).toBe('2023-01-01');
			}
		}
	});

	test.concurrent('same_pm5', () => {
		expect(is_after_pm5(dayjs('2023/1/1 17:00'))).toBe('2023-01-02');
	});
});
