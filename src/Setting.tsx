
import './css/App.css'
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import { init_cookie } from './func/cookie';

const Setting = () => {
	init_cookie();
	const [cookie, setCookie] = useCookies(["dp_count", "user_number", "class_count"]);

	return <>
		<Helmet>
			<title>School Hit - Setting</title>
		</Helmet>

		<h1>Setting</h1>

		<label htmlFor="dp_count">計算回数</label>
		<input type="number" id="dp_count" defaultValue={cookie.dp_count} min={1} max={100} step={1} />
	</>
}

export default Setting;
