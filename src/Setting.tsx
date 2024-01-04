import { Helmet } from 'react-helmet-async';
import { useCookies } from 'react-cookie';
import { Switch, Button } from '@fluentui/react-components';

import './css/App.css';
import './css/setting.css';
import { input_format } from './func/user_input';
import { cookie_date } from './variable/cookie';
import { useState } from 'react';

const cookie_list = [
	'user_number',
	'class_count',
	'year_in',
	'month_in',
	'show_equa',
];

const Setting = () => {
	const [cookie, setCookie, removeCookie] = useCookies(cookie_list);
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Helmet>
				<title>School Hit - Setting</title>
			</Helmet>

			<h1>Setting</h1>

			<h2>クラスの設定</h2>

			<label htmlFor='user_number'>あなたの出席番号</label>
			<input
				type='number'
				id='user_number'
				defaultValue={cookie.user_number}
				min={1}
				max={Number(cookie.class_count ?? 3776)}
				disabled={cookie.class_count === undefined}
				onChange={(event) =>
					setCookie('user_number', event.target.value, {
						maxAge: cookie_date,
					})
				}
			/>

			<br />

			<label htmlFor='class_count'>クラスの人数</label>
			<input
				type='number'
				id='class_count'
				defaultValue={cookie.class_count}
				min={1}
				max={100}
				onChange={(event) => {
					setCookie('class_count', event.target.value, {
						maxAge: cookie_date,
					});

					if (cookie.user_number !== undefined) {
						const to_change = input_format(
							Number(cookie.user_number),
							1,
							Number(event.target.value),
							true
						);
						setCookie('user_number', to_change, {
							maxAge: cookie_date,
						});

						const element = document.getElementById(
							'user_number'
						) as HTMLInputElement;
						element.value = String(to_change);
					}
				}}
			/>

			<br />

			<h2>初期値の設定</h2>

			<div className='init_settings'>
				<Switch
					checked={Boolean(cookie.year_in)}
					onChange={(_event, checked) =>
						setCookie('year_in', checked, {
							maxAge: cookie_date,
						})
					}
					label='年を含む'
				></Switch>

				<Switch
					id='month_in'
					checked={cookie.month_in}
					onChange={(event) =>
						setCookie('month_in', event.target.checked, {
							maxAge: cookie_date,
						})
					}
					label='月を含む'
				></Switch>
			</div>

			<h2>表示の設定</h2>

			<div className='init_settings'>
				<Switch
					checked={cookie.show_equa}
					onChange={(_event, checked) => {
						setCookie('show_equa', checked, {
							maxAge: cookie_date,
						});
					}}
					label='数式を表示'
				></Switch>
			</div>

			<br />

			<Button
				onClick={() => {
					setVisible(true);
				}}
			>
				設定をリセット
			</Button>

			<Modal {...bindings}>
				<Modal.Title>確認</Modal.Title>
				<Modal.Subtitle>この動作は取り消せません。</Modal.Subtitle>
				<Modal.Content>
					<p>
						設定(Cookie)は全て削除されます。 本当によろしいですか?
					</p>
				</Modal.Content>
				<Modal.Action
					passive
					onClick={() => setVisible(false)}
					placeholder={undefined}
				>
					キャンセル
				</Modal.Action>
				<Modal.Action
					type='error'
					onClick={() => {
						for (let i = 0; i < cookie_list.length; ++i) {
							removeCookie(cookie_list[i]);
						}
						location.href = '/school-hits/';
					}}
					placeholder={undefined}
				>
					続行
				</Modal.Action>
			</Modal>
		</>
	);
};

export default Setting;
