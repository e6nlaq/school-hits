
import { is_after_pm5, get_month_day } from '../src/func/date';
import dayjs from 'dayjs';

function zfill(a: number, n: number): string {
	return String(a).padStart(n, '0');
}

describe('is_after_pm5', () => {
	test('after_pm5', () => {
		for (let h: number = 17; h <= 23; ++h) {
			for (let m: number = 0; m < 60; ++m) {
				expect(is_after_pm5(dayjs(`2023/1/1 ${zfill(h, 2)}:${zfill(m, 2)}`))).toBe("2023-01-02");
			}
		}
	});

	test('before_pm5', () => {
		for (let h: number = 16; h >= 0; --h) {
			for (let m: number = 59; m >= 0; --m) {
				expect(is_after_pm5(dayjs(`2023/1/1 ${zfill(h, 2)}:${zfill(m, 2)}`))).toBe("2023-01-01");
			}
		}
	});

	test('same_pm5', () => {
		expect(is_after_pm5(dayjs("2023/1/1 17:00"))).toBe("2023-01-02");
	});
});

describe('get_month_day', () => {
	test('main', () => {
		for (let m: number = 1; m <= 12; ++m) {
			for (let d: number = 1; d <= 20; ++d) {
				expect(get_month_day(dayjs(`2023/${m}/${d} 0:00`))).toStrictEqual([m, d]);
			}
		}
	});
});
