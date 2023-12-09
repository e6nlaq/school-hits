
import dayjs from "dayjs";

import { get_month_day } from "../func/date";

describe('sample', () => {
	test.concurrent('all', () => {
		for (let m: number = 1; m <= 12; ++m) {
			for (let d: number = 1; d <= 20; ++d) {
				expect(get_month_day(dayjs(`2023/${m}/${d} 0:00`))).toStrictEqual([m, d]);
			}
		}
	});
});
