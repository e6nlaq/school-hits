import Cookies from "js-cookie";

/**
 * 未設定のCookieを`alert`でお知らせ
 */
export const check_cookie = (): boolean => {
	const unsetting_list: string[] = [];
	const check_list: string[] = [
		"class_count",
		"user_number"
	];

	for (let i = 0; i < check_list.length; ++i) {
		if (Cookies.get(check_list[i]) === undefined) {
			unsetting_list.push(check_list[i]);
		}
	}

	if (unsetting_list.length !== 0) {
		alert("未設定の必須の設定項目を検知しました。\n(" + unsetting_list.join(", ") + ")");
		return false;
	}

	return true;
}
