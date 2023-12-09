
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import React from 'react';

import './css/App.css'
import { init_cookie } from './func/cookie';
import { input_format } from './func/user_input';

// input_formatの簡略化
const format = (value: React.ChangeEvent<HTMLInputElement>, integer: boolean = true): number => {
	return input_format(Number(value.target.value), Number(value.target.min), Number(value.target.max), integer);
}

const Setting = () => {
	init_cookie();
	const [cookie, setCookie, removeCookie] = useCookies(["dp_count", "user_number", "class_count"]);

	return <>
		<Helmet>
			<title>School Hit - Setting</title>
		</Helmet>

		<h1>Setting</h1>

		<label htmlFor="dp_count">計算回数</label>
		<input type="number" id="dp_count" value={cookie.dp_count} min={1} max={10} onChange={(event) => {
			setCookie("dp_count", format(event));
		}} />

		<br />

		<label htmlFor="user_number">あなたの出席番号</label>
		<input type="number" id="user_number" value={cookie.user_number} min={1} max={1000} onChange={
			(event) => {
				setCookie("user_number", format(event));
			}
		} />

		<br />

		<label htmlFor="class_count">クラスの人数</label>
		<input type="number" id="class_count" value={cookie.class_count} min={1} max={1000} onChange={
			(event) => {
				setCookie("class_count", format(event));
			}
		} />

		<br /><br />

		<button style={{ color: "red" }} onClick={
			() => {
				if (confirm("設定(Cookie)は全て消されます。\n本当によろしいですか?")) {
					removeCookie("dp_count");
					removeCookie("user_number");
					removeCookie("class_count");
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
