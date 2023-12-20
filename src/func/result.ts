
export interface result_data {
	class: string,
	message: string,
}

export const get_result = (result: number): result_data => {
	if (result === 0) {
		return {
			class: "result_red",
			message: "ほぼ確定で当てられます。覚悟しましょう。"
		}
	}
	else if (result < 1) {
		return {
			class: "result_orangered",
			message: "休みがいたら当たる可能性大"
		}
	}
	else if (result === 1) {
		return {
			class: "result_orange",
			message: "先生によっては確実に当たる"
		}
	}
	else if (result <= 2) {
		return {
			class: "result_yellow",
			message: "運が悪いと当たるかも?"
		}
	}
	else if (result <= 3) {
		return {
			class: "result_rime",
			message: "ほぼ当たらないはず..."
		}
	}
	else {
		return {
			class: "result_safe",
			message: "ほぼ安全!でも油断は禁物!頑張って!"
		}
	}
}
