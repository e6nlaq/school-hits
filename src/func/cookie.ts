import Cookies from "js-cookie";

// import { cookie_date } from "../variable/cookie";

/**
 * Cookieをデフォルトの設定にする
 * @param force 強制的に実行するかどうか(規定値: false)
 * @deprecated 使わない方がい
 */
export const init_cookie = (force: boolean = false): void => {
	if (force || Cookies.get('dp_count') === undefined) {
		Cookies.set('dp_count', '5', { expires: 1 });
	}
}

/**
 * 未設定のCookieを`alert`でお知らせする。
 */
export const check_cookie = (): void => {
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
	}
}
