import dayjs from 'dayjs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import './css/App.css';
import './css/result.css';
import { is_after_pm5 } from './func/date';
import { dp_run } from './func/dp';
import { input_format } from './func/user_input';
import { result_data, get_result } from './func/result';
import { cookie_date } from './variable/cookie';

interface CookieSetting {
	name: 'class_count' | 'user_number';
	max: number;
	min: number;
	setting_name: string;
}

const Home = () => {
	const [cookies, setCookie, removeCookie] = useCookies([
		'class_count',
		'user_number',
		'year_in',
		'month_in',
		'show_equa',
	]);
	const [result, setResult] = useState(NaN);
	const [result_format, setResultFormat] = useState<result_data>({
		class: '',
		message: '',
	});
	const [equa, setEqua] = useState('');
	const [run_date, setRunDate] = useState(is_after_pm5(dayjs()));

	// Modal
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		visible: _a,
		setVisible: setCookieVisible,
		bindings: bindings_cookie,
	} = useModal();
	const [modal_list, setModalList] = useState<string[]>([]);

	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		visible: _b,
		setVisible: setInputVisible,
		bindings: bindings_input,
	} = useModal();

	const format_cookie = () => {
		// 各Cookieの最小値や最大値の設定
		const cookie_list: CookieSetting[] = [
			{
				name: 'class_count',
				min: 1,
				max: 100,
				setting_name: 'クラスの人数',
			},
			{
				name: 'user_number',
				min: 1,
				max: Number(cookies.class_count ?? 3776),
				setting_name: '出席番号',
			},
		];

		const res: string[] = [];

		for (let i = 0; i < cookie_list.length; ++i) {
			if (
				Number(cookies[cookie_list[i].name]) >= cookie_list[i].min &&
				Number(cookies[cookie_list[i].name]) <= cookie_list[i].max
			) {
				continue;
			}

			// Cookieが存在するときとしない時で場合分け
			if (cookies[cookie_list[i].name] === undefined) {
				res.push(cookie_list[i].setting_name);
			} else {
				removeCookie(cookie_list[i].name);
				setCookie(
					cookie_list[i].name,
					String(
						input_format(
							Number(cookies[cookie_list[i].name]),
							cookie_list[i].min,
							cookie_list[i].max
						)
					),
					{ maxAge: cookie_date }
				);
			}
		}

		return res;
	};

	console.log(cookies.show_equa);

	return (
		<>
			<Helmet>
				<title>School Hit</title>
			</Helmet>

			<h1>School Hit</h1>
			<Link to='/about'>使い方はこちら</Link>

			<br />
			<br />

			<input
				type='date'
				id='check_date'
				name='check_date'
				defaultValue={is_after_pm5(dayjs())}
				onChange={(event) => {
					setRunDate(event.target.value);
				}}
				alt='実行する日付'
			/>

			<br />

			<button
				onClick={() => {
					// ユーザーに見せるメッセージを消去
					setResult(NaN);
					setResultFormat({ class: '', message: '' });

					// Cookieを整形・チェック
					const formats = format_cookie();
					setModalList(formats);

					if (formats.length !== 0) {
						setCookieVisible(true);
					} else if (run_date === '') {
						setInputVisible(true);
					} else {
						// 実行
						const ans = dp_run(
							Number(cookies.class_count),
							dayjs(run_date),
							Boolean(cookies.year_in),
							Boolean(cookies.month_in)
						);
						setResult(ans[Number(cookies.user_number)].value);
						setResultFormat(
							get_result(ans[Number(cookies.user_number)].value)
						);
						setEqua(ans[Number(cookies.user_number)].equa);
					}
				}}
				className='run_button'
			>
				Check
			</button>

			<h2>あなたの安全度は...</h2>
			<h1 id='result' className={result_format.class}>
				{Number.isNaN(result) ? '未測定' : result}
			</h1>
			<div
				className='equa'
				style={cookies.show_equa ? {} : { display: 'none' }}
			>
				<BlockMath math={equa}></BlockMath>
			</div>
			<p className={result_format.class} style={{ fontSize: '20px' }}>
				{result_format.message}
			</p>

			{/* 以下Modal */}

			<Modal {...bindings_cookie}>
				<Modal.Title>Error</Modal.Title>
				<Modal.Subtitle>COOKIE_NOT_FOUND</Modal.Subtitle>
				<Modal.Content>
					未設定の設定が{modal_list.length}件あります。(
					{modal_list.join(', ')})
				</Modal.Content>
				<Modal.Action
					onClick={() => setCookieVisible(false)}
					placeholder={undefined}
				>
					OK
				</Modal.Action>
			</Modal>

			<Modal {...bindings_input}>
				<Modal.Title>Error</Modal.Title>
				<Modal.Subtitle>INPUT_BLANK</Modal.Subtitle>
				<Modal.Content>日付を入力してください。</Modal.Content>

				<Modal.Action
					onClick={() => setInputVisible(false)}
					placeholder={undefined}
				>
					OK
				</Modal.Action>
			</Modal>
		</>
	);
};

export default Home;
