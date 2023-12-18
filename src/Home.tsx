
import dayjs from 'dayjs';
import './css/App.css'
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';

import { is_after_pm5 } from './func/date';
import { check_cookie } from './func/cookie';
import { dp_run } from './func/dp';
import { input_format } from './func/user_input';
import { cookie_date } from './variable/cookie';

interface CookieSetting {
	name: "class_count" | "user_number",
	max: number,
	min: number,
}

const Home = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["class_count", "user_number"]);

	const format_cookie = () => {
		const cookie_list: CookieSetting[] = [
			{ name: "class_count", min: 1, max: 1000 },
			{ name: "user_number", min: 1, max: Number(cookies.class_count ?? 3776) },
		];

		console.log(cookie_list);
		for (let i = 0; i < cookie_list.length; ++i) {
			console.log(cookie_list[i].name, cookies[cookie_list[i].name]);
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

			<input type="date" id="check_date" defaultValue={is_after_pm5(dayjs())} />
			<br />
			<br />
			<button onClick={() => {
				format_cookie();
				if (check_cookie()) {
					console.log(dp_run(Number(cookies.class_count)));
				}
			}}>Check</button>
		</>
	)
}

export default Home;
