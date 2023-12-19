
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';

import './css/App.css'
import { input_format } from './func/user_input';
import { cookie_date } from './variable/cookie';

const cookie_list = ["user_number", "class_count"];

const Setting = () => {
	const [cookie, setCookie, removeCookie] = useCookies(cookie_list);

	return <>
		<Helmet>
			<title>School Hit - Setting</title>
		</Helmet>

		<h1>Setting</h1>

		<label htmlFor="user_number">あなたの出席番号</label>
		<input type="number" id="user_number" value={cookie.user_number} min={1} max={Number(cookie.class_count ?? 3776)} disabled={cookie.class_count === undefined} onChange={
			(event) => {
				setCookie("user_number", event.target.value, { maxAge: cookie_date });
			}
		} />

		<br />

		<label htmlFor="class_count">クラスの人数</label>
		<input type="number" id="class_count" value={cookie.class_count} min={1} max={100} onChange={
			(event) => {
				setCookie("class_count", event.target.value, { maxAge: cookie_date });
				setCookie("user_number", input_format(Number(cookie.user_number), 1, Number(event.target.value), true));
			}
		} />

		<br /><br />

		<button style={{ color: "red" }} onClick={
			() => {
				if (confirm("設定(Cookie)は全て消されます。\n本当によろしいですか?")) {
					for (let i = 0; i < cookie_list.length; ++i) {
						removeCookie(cookie_list[i]);
					}
					location.href = "/school-hits/";
				}
			}
		}>
			<span className="material-symbols-rounded">
				delete
			</span>
			設定をリセット
		</button>
	</>
}

export default Setting;
