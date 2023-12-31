// リザルトの型
// class: 表示する文字のクラス
// message: 下に表示するメッセージ
export interface result_data {
	class: string;
	message: string;
}

/**
 * 結果からユーザーに見せる形式を指定する
 * @param result dpの結果
 * @returns {result_data} ユーザーに見せる形式
 */
export const get_result = (result: number): result_data => {
	if (result === 0) {
		return {
			class: 'result_red',
			message: 'ほぼ確定で当てられます。覚悟しましょう。',
		};
	} else if (result < 1) {
		return {
			class: 'result_orangered',
			message: '当たる可能性あり',
		};
	} else if (result === 1) {
		return {
			class: 'result_orange',
			message: '先生によっては当たる',
		};
	} else if (result <= 1.5) {
		return {
			class: 'result_yellow',
			message: '運が悪いと当たるかも?',
		};
	} else if (result < 3) {
		return {
			class: 'result_rime',
			message: 'ほぼ当たらない',
		};
	} else {
		return {
			class: 'result_safe',
			message: '安全地帯!',
		};
	}
};
