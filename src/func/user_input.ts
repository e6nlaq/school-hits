/**
 * ユーザーが入力した数値を指定した形式で整形する
 * @param value ユーザーが入力した値
 * @param min 最小値
 * @param max 最大値
 * @param integer 整数(規定値: true)
 */
export const input_format = (
	value: number,
	min: number,
	max: number,
	integer: boolean = true,
) => {
	if (value < min) return min;
	else if (value > max) return max;

	if (integer) {
		return Math.round(value);
	} else {
		return value;
	}
};
