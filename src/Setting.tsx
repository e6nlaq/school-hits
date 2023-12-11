
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import React from 'react';

import './css/App.css'
import { input_format } from './func/user_input';
import { cookie_date } from './variable/cookie';

const cookie_list = ["dp_count", "user_number", "class_count"];

// input_formatの簡略化
const format = (value: React.ChangeEvent<HTMLInputElement>, integer: boolean = true): number => {
	return input_format(Number(value.target.value), Number(value.target.min), Number(value.target.max), integer);
}

const Setting = () => {
	const [cookie, setCookie, removeCookie] = useCookies(cookie_list);

	return <>
		<Helmet>
			<title>School Hit - Setting</title>
		</Helmet>

		<h1>Setting</h1>

		<label htmlFor="dp_count">計算回数</label>
		<input type="number" id="dp_count" value={cookie.dp_count} min={1} max={10} onChange={(event) => {
			setCookie("dp_count", format(event), { maxAge: cookie_date });
		}} />

		<br />

		<label htmlFor="user_number">あなたの出席番号</label>
		<input type="number" id="user_number" value={cookie.user_number} min={1} max={Number(cookie.class_count)} disabled={cookie.class_count === undefined} onChange={
			(event) => {
				setCookie("user_number", format(event), { maxAge: cookie_date });
			}
		} />

		<br />

		<label htmlFor="class_count">クラスの人数</label>
		<input type="number" id="class_count" value={cookie.class_count} min={1} max={1000} onChange={
			(event) => {
				setCookie("class_count", format(event), { maxAge: cookie_date });
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
