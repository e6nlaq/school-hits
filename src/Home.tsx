
import dayjs from 'dayjs';
import './css/App.css'
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';

import { is_after_pm5 } from './func/date';
import { check_cookie } from './func/cookie';
import { dp_run } from './func/dp';
import { cookie_date } from './variable/cookie';

const Home = () => {
	const [cookies, setCookie] = useCookies(["dp_count"]);

	if (cookies.dp_count === undefined) {
		setCookie('dp_count', 5, { maxAge: cookie_date });
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
				if (check_cookie()) {
					console.log(dp_run());
				}
			}}>Check</button>
		</>
	)
}

export default Home;
