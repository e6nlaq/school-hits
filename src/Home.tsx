
import dayjs from 'dayjs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';

import './css/App.css'
import './css/result.css'
import { is_after_pm5 } from './func/date';
import { check_cookie } from './func/cookie';
import { dp_run } from './func/dp';
import { input_format } from './func/user_input';
import { result_data, get_result } from './func/result';
import { cookie_date } from './variable/cookie';

interface CookieSetting {
	name: "class_count" | "user_number",
	max: number,
	min: number,
}

const Home = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["class_count", "user_number"]);
	const [result, setResult] = useState(NaN);
	const [result_format, setResultFormat] = useState<result_data>({ class: "", message: "" });
	const [run_date, setRunDate] = useState<dayjs.Dayjs>(dayjs());

	const format_cookie = () => {
		// 各Cookieの最小値や最大値の設定
		const cookie_list: CookieSetting[] = [
			{ name: "class_count", min: 1, max: 100 },
			{ name: "user_number", min: 1, max: Number(cookies.class_count ?? 3776) },
		];

		for (let i = 0; i < cookie_list.length; ++i) {
			if (Number(cookies[cookie_list[i].name]) >= cookie_list[i].min && Number(cookies[cookie_list[i].name]) <= cookie_list[i].max) {
				continue;
			}

			// Cookieが存在するときとしない時で場合分け
			if (cookies[cookie_list[i].name] === undefined) {
				setCookie(cookie_list[i].name, String(cookie_list[i].min), { maxAge: cookie_date });
			} else {
				removeCookie(cookie_list[i].name);
				setCookie(cookie_list[i].name, String(input_format(Number(cookies[cookie_list[i].name]), cookie_list[i].min, cookie_list[i].max)), { maxAge: cookie_date });
			}
		}
	}

	return (
		<>
			<Helmet>
				<title>School Hit</title>
			</Helmet>

			<h1>School Hit</h1>
			<br />

			<input type="date" id="check_date" defaultValue={is_after_pm5(dayjs())} onChange={(event) => {
				setRunDate(dayjs(event.target.value));
			}} />
			<br />
			<br />
			<button onClick={() => {
				// ユーザーに見せるメッセージを消去
				setResult(NaN);
				setResultFormat({ class: "", message: "" })

				// 設定を整形
				format_cookie();
				if (check_cookie()) {
					// 実行
					const ans = dp_run(Number(cookies.class_count), run_date);
					setResult(ans[Number(cookies.user_number)]);
					setResultFormat(get_result(ans[Number(cookies.user_number)]));
				}
			}}>Check</button>

			<h2>あなたの安全度は...</h2>
			<h1 id='result' className={result_format.class}>{Number.isNaN(result) ? "未測定" : result}</h1>
			<p className={result_format.class} style={{ fontSize: "20px" }}>{result_format.message}</p>
		</>
	)
}

export default Home;
