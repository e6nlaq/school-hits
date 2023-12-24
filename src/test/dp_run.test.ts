import dayjs from 'dayjs';

import { dp_run } from '../func/dp';
import { get_month_day, is_after_pm5 } from '../func/date';

describe('roop', () => {
	test.concurrent('length', () => {
		for (let i = 1; i <= 10; ++i) {
			const [y, m, d] = get_month_day(dayjs(is_after_pm5(dayjs())));
			const plus = Number(m > i) + Number(d > i) + Number(y > i);

			const result = dp_run(i);
			console.log(i, plus, y, m, d);
			expect(Object.keys(result).length).toBeLessThanOrEqual(i + plus);
		}
	});
});
